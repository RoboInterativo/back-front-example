# examples/server_simple.py
from aiohttp import web
import aiohttp_jinja2
import jinja2
import pathlib

@aiohttp_jinja2.template('index.html')
async def handle(request):
    name = request.match_info.get('name', "Anonymous")
    text = "Hello, " + name
    #return web.Response(text=text)
    return {}

async def auth(request):
    #name = request.match_info.get('name', "Anonymous")
    #text = "Hello, " + name
    #return web.Response(text=text)
    ##data
    ##username = request.match_info.get('name', "Anonymous")
    #password = request.match_info.get('password', "nopass")

    form = await request.json()
    username=form['username']
    if username=='admin':
        role='Admin'
    else:
        role='User'
    res={
     'id': 1,
     'username': username,
     'firstName': 'user.firstName',
     'lastName': 'user.lastName',
     'role': role,
     'token': role
    }
    resp = web.Response(status=204, content_type='application/json')
    headers={ "Authorization": "ABC123" }
    return web.json_response(data=res,headers=headers)

async def users(request):
    res=  [{ 'id': 1,
             'username':  'admin',
             'password': 'admin',
             'firstName': 'Admin',
             'lastName': 'User',
             'role': 'Admin' }]
    return web.json_response(res)
#      return ok({
# id: user.id,
# username: user.username,
# firstName: user.firstName,
# lastName: user.lastName,
# role: user.role,
# token: `fake-jwt-token.${user.role}`
# async def wshandle(request):
#     ws = web.WebSocketResponse()
#     await ws.prepare(request)
#
#     async for msg in ws:
#         if msg.type == web.WSMsgType.text:
#             await ws.send_str("Hello, {}".format(msg.data))
#         elif msg.type == web.WSMsgType.binary:
#             await ws.send_bytes(msg.data)
#         elif msg.type == web.WSMsgType.close:
#             break
#
#     return ws
PROJECT_ROOT = pathlib.Path(__file__).parent

async def my_web_app():
  app = web.Application()
  aiohttp_jinja2.setup(
      app,   loader=jinja2.FileSystemLoader('templates'))
  app.add_routes([web.get('/', handle),
                web.get('/admin', handle),
                web.post('/users/authenticate',auth),
                web.get('/users',users),
                web.get('/users/{user_id}',users)

                ])
  app.router.add_static('/static/',
                      path=PROJECT_ROOT / 'static',
                      name='static')
  return app

#if __name__ == '__main__':
#    web.run_app(app)
