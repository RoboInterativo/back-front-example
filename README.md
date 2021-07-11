==back_end==
Переходим в back2

virtualenv -p python3 venv

Активируем среду
source venv bin activate venv

Устанавливаем зависимости

pip3 install -r requirements.txt

Запускаем сервер

gunicorn3 my_app_module:my_web_app --bind 0.0.0.0:8888 --worker-class aiohttp.GunicornWebWorker
