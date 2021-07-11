back_end
==========

Переходим в back2
```bash
virtualenv -p python3 venv
```
Активируем среду

```bash
source venv bin activate venv
```
Устанавливаем зависимости

```bash
pip3 install -r requirements.txt
```bash

Запускаем сервер

```bash
gunicorn3 my_app_module:my_web_app --bind 0.0.0.0:8888 --worker-class aiohttp.GunicornWebWorker
```bash
