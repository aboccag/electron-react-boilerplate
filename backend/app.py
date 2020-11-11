from flask import Flask
from datetime import datetime
import docker

app = Flask(__name__)

import os


@app.route('/')
def hello_world():
  return 'Hello World!'


@app.route('/docker/info')
def docker_info():
  client = docker.from_env()
  info = client.info()
  print(info)
  return 'ok'


@app.route('/docker/containers')
def docker_containers():
  client = docker.from_env()
  for container in client.containers.list():
    print(container.name)
  return 'ok'


@app.route('/docker/influxdb/version')
def docker_influxdb_version():
  client = docker.from_env()
  for container in client.containers.list():
    if container.name == "influxdb":
      exec_log = container.exec_run("influx -version")
      if exec_log[0] == 0:
        return exec_log[1]
  return 'mad'


@app.route('/docker/influxdb/backup')
def docker_influxdb_backup():
  client = docker.from_env()
  for container in client.containers.list():
    if container.name == "influxdb":
      now = datetime.now().strftime("%d-%m-%Y_%H-%M-%S")
      exec_log = container.exec_run(f"influxd backup -portable /backup/{now}_akatech_influx_backup")
      if exec_log[0] == 0:
        # Parent Directory path
        parent_dir = 'C:\influxdbbackup'

        if not os.path.exists(parent_dir):
          os.makedirs(parent_dir)

        os.system(f"docker cp influxdb:/backup/{now}_akatech_influx_backup {parent_dir}")
        # client.exec_run(f"docker cp influxdb:/backup/{now}_akatech_influx_backup C:\influxbackup")
        return exec_log[1]
  return 'mad'


if __name__ == '__main__':
  app.run()
