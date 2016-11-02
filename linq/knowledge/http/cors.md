# Cross Origin Resource Share 

[������Դ����CORS-��һ��](http://www.ruanyifeng.com/blog/2016/04/cors.html)

CORS��һ��W3C��׼��ȫ���ǡ�������Դ��������������������Դ������������XMLHttpReqest���󣬴Ӷ��˷���AJAXֻ��ͬԴʹ�õ����ơ�

## һ�����

CORS��Ҫ������ͷ�����ͬʱ֧�֡�Ŀǰ�����е��������֧�ָù��ܣ�IE��������ܵ���IE10.

�ص㣺
1.  ����CORSͨѶ���̣�����������Զ���ɣ�����Ҫ�û�����
2.  ������AJAXͨѶû�в�������һ������AJAX��������Զ�����һЩͷ��Ϣ����ʱ���Զ���һ��OPTIONS����
3.   ֻҪ����������ӦResponseʵ��CORS������acess-control-allow-originͷ��������ǰdomain��method������Χ�ھ���Ϊ����Success

***ʵ��CORSͨѶ�ؼ��Ƿ�������ֻҪ������ʵ��CORS�ӿڣ��Ϳ��Կ�ԴͨѶ***

ԭ��1��

```javascript
var xtr = new XMLHttpRequest();
xtr.open('post', 'http://192.168.2.151:8010/restapi/accounts/api/letters/count', true);
xtr.onreadystatechange=function(){
	if(this.readyState ===4){
		if(this.status===200){
			console.log(this, 'game over successed');
		}else{
			console.log(this, 'game over failed');
		}
	}
};
xtr.onerror=function(){console.log(this);};
xtr.send(JSON.stringify({test:'aaa'}));

```

jquery��

```javascript
$.ajax({
type:'post',
url:'http://192.168.2.151:8010/restapi/accounts/api/letters/count',
crossDomain:true,		//�˲����ڲ������������£�jquery�Զ�ʶ��
headers:{'auth':'aaaaaa'},
data:{test:'aaa'}
});
```

�������ֻҪhttp://192.168.2.151:8010/restapi/accounts/api/letters/countʵ��CORS����ֱ�ӷ��ʡ�

## ������������

�������CORS����ֳ����ࣺ������simple request���ͷǼ�����not-no-simple Request��

ֻҪͬʱ����һ�����������������ڼ�����

+ (1)�����󷽷���һ�����ַ���֮һ
	- HEAD
	- GET 
	- POST
+ (2)��HTTP��ͷ��Ϣ������һ�¼����ֶΣ�
	- Accept
	- Accept-language
	- content-Language
	- Last-Event-ID
	- content-type��ֻ����appliction/x-www-form-urlencoded��multipart/form-data��text/plain

���ǲ���ͬʱ�����������������������ڷǼ����������������������ʽ�ǲ�һ���ġ�

## ����������

�����ֱ�ӷ���CORS���󣬾�����˵�����������ͷ��Ϣ�У�����һ��Originͷ��


```
GET /cors HTTP/1.1
Origin: http://api.bob.com
Host: api.alice.com
Accept-Language: en-US
Connection: keep-alive
User-Agent: Mozilla/5.0...

```

�����ͷ��Ϣ�У�**Origin**�ֶ�����˵�����������������ĸ�Դ��Э�� + ���� + �˿ڣ����������������ֵ�������Ƿ�ͬ���������

ʶ��������
+ ���Originָ����Դ��������Χ�ڣ��������᷵��һ�������Ҳ���**Access-control-**���ͷ�������ʶ���֪�������ˡ��ͻ��XMLHttpRequest��onerror�ص���������**ע�⣺response.status��Ȼ������200**

+ ���Originָ������������ɷ�Χ�ڣ����ط�����Ӧ�����������ֶ���Ϣ��

```
Access-Control-Allow-Origin: http://api.bob.com
Access-Control-Allow-Credentials: true
Access-Control-Expose-Headers: FooBar
```

���ڷ�������[ Response Header]�·�����ͷ���ͣ�

```
Access-Control-Allow-Credentials
Access-Control-Expose-Headers 
Access-Control-Max-Age 
Access-Control-Allow-Methods 
Access-Control-Allow-Headers 

```

#### (1)Access-Control-Allow-Origin

���ֶ��Ǳ���ġ�����ֵҪô������ʱ**Origin**�ֶε�ֵ��Ҫô��һ��*����ʾ������������������**����������URI**����

#### (2)Access-Control-Allow-Credentials

���ֶο�ѡ������ֵ��һ������ֵ����ʾ�Ƿ�������Cookie��Ĭ������£�Cookie��������CORS����֮�С�

�������ã�
+ ���Ʒ������Ƿ��·�Cookie
+ ���ƿͻ����Ƿ�������Cookieͷ

####(3) Access-Control-Allow-Headers
���ֶο�ѡ������һ���ַ������Զ��ŷָ�֧�ֶ��ͷ��Ĭ���������**Access-Control-Request-Headers**�ɶԳ��֡�

####(4) Access-Control-Expose-Headers

������ֻ��6����ͷ���������أ���������js�ű����ʣ�
+ Cache-Control
+ Content-Language
+ Content-Type
+ Expires
+ Last-Modified
+ Pragma

�����Ҫ����content-length֮���ͷ����Ҫ��response��ָ��Access-Control-Expose-Headersͷ��

```
Access-Control-Expose-Headers: content-length
```

���ֶο�ѡ������һ���ַ�����Access-Control-Allow-Headers���ƣ����붺�ŷ������¶ͷ�������ű����Է��ʵ�ͷ��


####(5) Access-Control-Allow-Method

���ֶ��Ǳ���ģ�������һ���ַ�����ɣ����ö��ŷָ���ÿ��ֵ��HTTP����Methodֵ���Ƿ�����ͬԴ����ʱ����������ж�Server��֧�ֵ�����ʽ��ʶ����Ƿ�ɹ�CORS����


### withCredentials����

����˵����CORS����Ĭ�ϲ�����Cookie��HTTP������Ϣ�������Ҫ��Cookie���͵���������һ������Ҫ������ͬ�⣬ָ��**Access-Control-Allow-Credentails**�ֶ�

```
Access-Control-Allow-Credentials: true
```

����һ���棬�����߱�����AJAX�����д�withCredentials����


```
var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

//����
$.ajax({
	xhrFields:{
		withCredentials: true
	}
});

```

���ʡ�Ըò�����Ҳ�ᵱ��withCredentialsΪtrue�Ǵ����Զ�����Cookie

��������ʾ�Ĺرգ�withCredentials

```
xhr.withCredentials = false;
```

***ע�⣺���Ҫ����Cookie��Access-Control-Allow-Origin����ָ����ȷ�ġ���������ҳһ�µ���������������* ***


���⣺
+ ���Ӧ�ã��Ǳ����ļ���ֻ����ʹ��Access-Control-Allow-OriginΪ*����˻��Ӧ���в�����Cookie��Ϊ�����֤��ʽ
+ �·���Cookie��Ȼ��ѭ�����**ͬԴ����**������Cookie����ʹ��Document.Cookie��ȡ


## �ġ��Ǽ�����

�Ǽ����������ֶԷ�����������Ҫ������󣬱������󷽷���PUT��DELETE������Content-Type�ֶε�������application/json��


�Ǽ������CORS���󣬻�����ʽͨ��֮ǰ������һ��HTTP��ѯ���󣬳�Ϊ"Ԥ��"����preflight����

�������ѯ�ʷ���������ǰ��ҳ���ڵ������Ƿ��ڷ��������������֮�У��Լ�����ʹ����ЩHTTP���ʺ�ͷ��Ϣ�ֶΡ�ֻ�еõ��϶��𸴣�������Żᷢ����ʽ��XMLHttpRequest���󣬷���ͱ���

#### Ԥ������

```javascript
var url = 'http://api.alice.com/cors';
var xhr = new XMLHttpRequest();
xhr.open('PUT', url, true);
xhr.setRequestHeader('X-Custom-Header', 'value');
xhr.send();
```

��������У�HTTP����ķ�����PUT�����ҷ���һ���Զ���ͷ��ϢX-Custom-Header��

��������֣�����һ���Ǽ����󣬾��Զ�����һ��"Ԥ��"����Ҫ�������ȷ�Ͽ��������������������"Ԥ��"�����HTTPͷ��Ϣ��

```javascript
OPTIONS /cors HTTP/1.1
Origin: http://api.bob.com
Access-Control-Request-Method: PUT
Access-Control-Request-Headers: X-Custom-Header
Host: api.alice.com
Accept-Language: en-US
Connection: keep-alive
User-Agent: Mozilla/5.0...

```

"Ԥ��"�����õ����󷽷���**OPTIONS**����ʾ�������������ѯ�ʵġ�ͷ��Ϣ���棬�ؼ��ֶ���**Origin**����ʾ���������ĸ�Դ��


����**Origin**�ֶΣ�"Ԥ��"�����ͷ��Ϣ�������������ֶΣ�

######��1��Access-Control-Request-Method
���ֶ��Ǳ���ģ������г��������CORS������õ���ЩHTTP������������PUT��

######��2��Access-Control-Request-Headers
���ֶ���һ�����ŷָ����ַ�����ָ�������CORS�������ⷢ�͵�ͷ��Ϣ�ֶΣ�������X-Custom-Header��


#### Ԥ������Ļ�Ӧ

�������յ�"Ԥ��"�����Ժ󣬼����**Origin**��**Access-Control-Request-Method**��**Access-Control-Request-Headers**�ֶ��Ժ�ȷ�������Դ���󣬾Ϳ���������Ӧ

```
HTTP/1.1 200 OK
Date: Mon, 01 Dec 2008 01:15:39 GMT
Server: Apache/2.0.61 (Unix)
Access-Control-Allow-Origin: http://api.bob.com
Access-Control-Allow-Methods: GET, POST, PUT
Access-Control-Allow-Headers: X-Custom-Header
Content-Type: text/html; charset=utf-8
Content-Encoding: gzip
Content-Length: 0
Keep-Alive: timeout=2, max=100
Connection: Keep-Alive
Content-Type: text/plain
```


�����HTTP��Ӧ�У��ؼ�����**Access-Control-Allow-Origin**�ֶΣ���ʾhttp://api.bob.com�����������ݡ����ֶ�Ҳ������Ϊ�Ǻţ���ʾͬ�������Դ����

```
Access-Control-Allow-Origin: *
```


������������"Ԥ��"���󣬻᷵��һ��������HTTP��Ӧ������û���κ�CORS��ص�ͷ��Ϣ�ֶΡ�**������ͻ��������������ͬ��Ԥ��������˴���onerror�ص���������**

```
XMLHttpRequest cannot load http://api.alice.com.
Origin http://api.bob.com is not allowed by Access-Control-Allow-Origin.

```

#### ���������������ͻ�Ӧ

һ��������ͨ����"Ԥ��"�����Ժ�ÿ�������������CORS���󣬾Ͷ���������һ��������һ��**Origin**ͷ��Ϣ�ֶΡ��������Ļ�Ӧ��Ҳ������һ��**Access-Control-Allow-Origin**ͷ��Ϣ�ֶΡ�

```
PUT /cors HTTP/1.1
Origin: http://api.bob.com
Host: api.alice.com
X-Custom-Header: value
Accept-Language: en-US
Connection: keep-alive
User-Agent: Mozilla/5.0...

```
����ͷ��Ϣ��**Origin**�ֶ���������Զ���ӵġ�


�����Ƿ����������Ļ�Ӧ��

```
Access-Control-Allow-Origin: http://api.bob.com
Content-Type: text/html; charset=utf-8

```


**����ͷ��Ϣ�У�Access-Control-Allow-Origin�ֶ���ÿ�λ�Ӧ���ض������ġ�**














