unit MainFrm;

interface

uses
  Winapi.Windows, Winapi.Messages, System.SysUtils, System.Variants,
  System.Classes, Vcl.Graphics, Vcl.Controls, Vcl.Forms, Vcl.Dialogs,
  Vcl.Edge, Vcl.StdCtrls, System.JSON;

type
  TForm1 = class(TForm)
    EdgeBrowser1: TEdgeBrowser;
    procedure FormCreate(Sender: TObject);
    procedure EdgeBrowser1WebMessageReceived(Sender: TCustomEdgeBrowser;
      Args: TWebMessageReceivedEventArgs);
  private
    procedure HandleXuiMessage(const Msg: TJSONObject);
    procedure HandleRequest(const Payload: TJSONObject);
    procedure HandleStorage(const MsgType: string; const Payload: TJSONObject);
    procedure HandleNavigation(const MsgType: string; const Payload: TJSONObject);
    procedure SendResponse(const ResponseId: string; const Data: TJSONObject);
  public
  end;

var
  Form1: TForm1;

implementation

{$R *.dfm}

procedure TForm1.FormCreate(Sender: TObject);
begin
  EdgeBrowser1.Align := alClient;
  EdgeBrowser1.Navigate('file:///D:/chenyu-project/xui-project/examples/demo/dist/index.html');
end;

procedure TForm1.EdgeBrowser1WebMessageReceived(Sender: TCustomEdgeBrowser;
  Args: TWebMessageReceivedEventArgs);
var
  MsgStr: string;
  JSON: TJSONObject;
begin
  MsgStr := Args.TryGetWebMessageAsString;
  try
    JSON := TJSONObject.ParseJSONValue(MsgStr) as TJSONObject;
    try
      HandleXuiMessage(JSON);
    finally
      JSON.Free;
    end;
  except
    on E: Exception do
      OutputDebugString(PChar('XUI FMX Error: ' + E.Message));
  end;
end;

procedure TForm1.HandleXuiMessage(const Msg: TJSONObject);
var
  MsgType: string;
  Payload: TJSONObject;
  ResponseId: string;
begin
  MsgType := Msg.GetValue<string>('type');
  Payload := Msg.GetValue<TJSONObject>('payload');
  ResponseId := Msg.GetValue<string>('_id');

  if MsgType = 'request' then
    HandleRequest(Payload)
  else if MsgType.StartsWith('storage_') then
    HandleStorage(MsgType, Payload)
  else if MsgType.StartsWith('nav_') then
    HandleNavigation(MsgType, Payload);
end;

procedure TForm1.HandleRequest(const Payload: TJSONObject);
var
  HttpClient: THTTPClient;
  HttpResponse: IHTTPResponse;
  Url, Method: string;
  ResponseJSON: TJSONObject;
begin
  Url := Payload.GetValue<string>('url');
  Method := Payload.GetValue<string>('method');

  HttpClient := THTTPClient.Create;
  try
    if Method = 'POST' then
      HttpResponse := HttpClient.Post(Url, nil)
    else
      HttpResponse := HttpClient.Get(Url);

    ResponseJSON := TJSONObject.Create;
    try
      ResponseJSON.AddPair('status', HttpResponse.StatusCode);
      ResponseJSON.AddPair('data', HttpResponse.ContentAsString());
      SendResponse('', ResponseJSON);
    finally
      ResponseJSON.Free;
    end;
  finally
    HttpClient.Free;
  end;
end;

procedure TForm1.HandleStorage(const MsgType: string; const Payload: TJSONObject);
var
  Key, Value: string;
  StorageFile: string;
begin
  Key := Payload.GetValue<string>('key');
  StorageFile := ExtractFilePath(ParamStr(0)) + 'xui_storage_' + Key + '.json';

  if MsgType = 'storage_set' then
  begin
    Value := Payload.GetValue<string>('value');
    TFile.WriteAllText(StorageFile, Value);
  end
  else if MsgType = 'storage_get' then
  begin
    if TFile.Exists(StorageFile) then
      Value := TFile.ReadAllText(StorageFile)
    else
      Value := 'null';
    SendResponse('', TJSONObject.ParseJSONValue(Value) as TJSONObject);
  end
  else if MsgType = 'storage_remove' then
  begin
    if TFile.Exists(StorageFile) then
      TFile.Delete(StorageFile);
  end
  else if MsgType = 'storage_clear' then
  begin
    // Clear all storage files
  end;
end;

procedure TForm1.HandleNavigation(const MsgType: string; const Payload: TJSONObject);
var
  Url: string;
begin
  Url := Payload.GetValue<string>('url');
  if MsgType = 'nav_push' then
    EdgeBrowser1.Navigate(Url)
  else if MsgType = 'nav_replace' then
    EdgeBrowser1.Navigate(Url);
end;

procedure TForm1.SendResponse(const ResponseId: string; const Data: TJSONObject);
var
  Response: TJSONObject;
  JSONStr: string;
begin
  Response := TJSONObject.Create;
  try
    Response.AddPair('type', 'response');
    if ResponseId <> '' then
      Response.AddPair('_id', ResponseId);
    Response.AddPair('payload', Data);
    JSONStr := Response.ToString;
    EdgeBrowser1.ExecuteScript('window.chrome.webview.postMessage(' + JSONStr + ')');
  finally
    Response.Free;
  end;
end;

end.
