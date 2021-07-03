
# -*- coding: utf-8 -*-

from telegram.ext import Updater
from telegram.ext import CommandHandler
import logging
import yaml
import requests
import markdown
from telegram import (ParseMode,
                      Update,
                      ReplyKeyboardMarkup,
                      KeyboardButton,
                      InlineKeyboardButton,
                      InlineKeyboardMarkup,)


from telegram.ext import (

    CallbackQueryHandler,
    ConversationHandler,
    CallbackContext,
)
#import docker
#containers_list=[]

with open('./config.yaml') as f:
    config = yaml.safe_load(f)

testing = config['testing']
print(testing)
#print (tok)
default_message_for_not_members = '''
Эта комманда доступна только из группового чата,
если ты в ней зарегистрирован  набери комманду из нее.
Если нет, то заполни анкету и получи к ней доступ.
Пока бот в разработке ты можешь пообщатся с моим автором в личке.
'''

logging.basicConfig(format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
                    level=logging.DEBUG)

# Stages
FIRST, SECOND = range(2)
# Callback data
ONE, TWO, THREE, FOUR = range(4)



def trelloapi_getcard (id):
    base_url = "https://api.trello.com/1/"
    method = "lists/{}/cards?fields=all".format(id)
    print(config.keys() )
    url= (base_url+method+"&key={}&token={}").format(config['trello']['key'], config['trello'] ['token']   )
    r=requests.get(url)
    print (r.json ())
    return r.json ()


def start(update, context):
#def start(update: Update, _: CallbackContext) -> int:
    #chat_id=update.effective_chat.id
    #update.message.from_user
    user = update.message.from_user
    keyboard = [
        [
            InlineKeyboardButton("1", callback_data=str(ONE)),
            InlineKeyboardButton("2", callback_data=str(TWO)),
        ]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    # Send message with text and appended InlineKeyboard
    update.message.reply_text("Start handler, Choose a route", reply_markup=reply_markup)
    # Tell ConversationHandler that we're in state `FIRST` now
    return FIRST
    # #-462030398,
    #
    # if chat_id==GROUP_ID:
    #     context.bot.send_message(
    # chat_id=chat_id, text="Привет я твой помошник, узнай что я могу /help" )
    #     print(update.effective_chat.id)
    # else:
    #    message='''
    #    Привет я бот помошник, ты можешь вводить следующие команды:
    #    '''
    #    keyboard=[ [  InlineKeyboardButton("Смотреть видео", callback_data= 'chestnut') ]]
    #    reply= InlineKeyboardMarkup(keyboard)
    #    context.bot.send_message( chat_id=chat_id,text='message',reply_markup=reply )
    #    # context.bot.send_message(   chat_id=chat_id,
    #    # text='''
    #    # Привет я бот помошник, ты можешь вводить следующие команды:
    #    # /watchvideo Видео о создании бота
    #    # /step0 Создать бота и получить токен
    #    # /step1 Получить код тестового бота
    #    # /finalstep Если хочешь обучатся вместе со мной и получить доступ к JUPITER Notebook
    #    # заполни анкету в боте и получи ссылку на группу обучаюшихся
    #    # /jupiter Получить ссылку для работы в Jupiter NoteBook для программирования прямо в браузеере
    #    # /deploy Установить бота на наш сервер
    #    # /workshop Ссылку на запись воркшопов
    #    # ''')
    #    print(update.effective_chat.id)
def help(update, context):
    chat_id=update.effective_chat.id
    #-462030398,


    context.bot.send_message(
    chat_id=chat_id, text='''
    Список комманд бота:
    /jupiter Запустить jupiter ноутбук для практики
    /workshop Прошедшие занятия, видео
    /rules Правила поведения в группе
    /mybotlist

    ''')

    print(update.effective_chat.id)
def trello (update, context):
    chat_id=update.effective_chat.id
    id=config['trello']['id_list']
    trelloapi_getcard(id)
    for el in r.json ():
        message='{}\n{}'.format(el[ 'name'],el['desc'])
        context.bot.send_message( chat_id=chat_id, text=message)



def rules (update, context):
    chat_id=update.effective_chat.id
    id=config['trello']['rules']
    tr=trelloapi_getcard(id)
    for el in tr:
        message='{}\n{}'.format(el[ 'name'],el['desc'])
        #context.bot.send_message( chat_id=chat_id, text=message)
        html = markdown.markdown(message)
        html=html.replace('<p>','').replace('</p>','')
        html=html.replace('<h1>','<b>').replace('</h1>','</b>')
        print (html)
        # html2='''
        # <pre><code class="language-python">
        # r=requests.get(url)
        # print (r.json ())
        # for el in r.json ():
        #     message='{}\n\n{}'.format(el[ 'name'],el['desc'])
        # </code></pre>
        # '''
        context.bot.send_message( chat_id=chat_id, text=html,parse_mode=ParseMode.HTML)
    print(update.effective_chat.id )

def  mybotlist (update, context):
     chat_id=update.effective_chat.id
     #keyboard=[ [    KeyboardButton(text="@Alexpricker"),KeyboardButton(text="@Alexpricker")  ],
     #[    KeyboardButton(text="@Alexpricker"),KeyboardButton(text="@Alexpricker")  ] ]
     #reply=ReplyKeyboardMarkup(keyboard=keyboard,resize_keyboard=True)
     keyboard=[ [  InlineKeyboardButton("@Alexpricker", callback_data= 'chestnut') ]]
     reply= InlineKeyboardMarkup(keyboard)
     context.bot.send_message( chat_id=chat_id,text='message',reply_markup=reply )
     #update.message.reply_text(text='message',reply_markup=reply )


def jupiter(update, context):
    chat_id=update.effective_chat.id
    #-462030398,
    with open('./tok.yml') as f:
        tok = yaml.safe_load(f)
    message="Для работы с Jupiter Notebook входи http://robointerativo.ru:8888/?token={}".format(tok['token'] )

    if chat_id==GROUP_ID:
        context.bot.send_message( chat_id=chat_id, text=message )
        print(update.effective_chat.id )
    else:
        context.bot.send_message(   chat_id=chat_id,
        text=default_message_for_not_members)
        print(update.effective_chat.id)
def watchvideo (update, context):
    chat_id=update.effective_chat.id
    url="https://www.youtube.com/watch?v=46DwvjUM_A0"
    message='''
    Для того чтобы понять как создавать ботов в телеграмм
    Посмотри видео на моем канале {}
    '''.format(url)
    context.bot.send_message( chat_id=chat_id, text=message)

def step1 (update, context):
    html2='''
     <pre><code class="language-python">
     r=requests.get(url)
     print (r.json ())
     for el in r.json ():
         message='{}\n\n{}'.format(el[ 'name'],el['desc'])
    </code></pre>
     '''
    context.bot.send_message( chat_id=chat_id, text=html,parse_mode=ParseMode.HTML)

if testing :
    TOKEN=config['telegram']['token_test']
else:
    TOKEN=config['telegram']['token']
if testing :
    GROUP_ID=config['telegram']['allow_group_test']
else:
    GROUP_ID=config['telegram']['allow_group']

updater = Updater(token=TOKEN, use_context=True)

dispatcher = updater.dispatcher

conv_handler = ConversationHandler(
entry_points=[CommandHandler('start', start)],
states={
    FIRST: [
        CallbackQueryHandler(watchvideo, pattern='^' + str(watchvideo) + '$'),

    ],

},
fallbacks=[CommandHandler('start', start)],
)

# Add ConversationHandler to dispatcher that will be used for handling updates
dispatcher.add_handler(conv_handler)

# handlers=[]
# handlers.append (CommandHandler('start', start))
# handlers.append (CommandHandler('help', help))
# handlers.append (CommandHandler('step1', trello))
# handlers.append (CommandHandler('watchvideo', watchvideo))
# #handlers.append (CommandHandler('workshop', trello))
# handlers.append (CommandHandler('jupiter', jupiter))
# #handlers.append (C
# handlers.append (CommandHandler('rules', rules))


# # mybotlist_handler = CommandHandler('mybots', mybotlist)
# for handler in handlers:
#     dispatcher.add_handler(handler)



updater.start_polling()
