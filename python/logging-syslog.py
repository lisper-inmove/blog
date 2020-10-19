# -*- coding: utf-8 -*-

import socket
import logging
import logging.handlers
import time

logger = logging.getLogger("main")
logger_level = logging.INFO
logger.setLevel(logger_level)

datefmt = "%Y-%m-%d %H:%M:%S"
fmt = "%(name)s: - %(levelname)s %(thread)s %(module)s %(filename)s %(lineno)s %(funcName)s - %(message)s"
formatter = logging.Formatter(fmt, datefmt=datefmt)

# syslog处理器
# tail -f /var/log/syslog
sh = logging.handlers.SysLogHandler(address=("127.0.0.1", 514), facility="local6", socktype=socket.SOCK_STREAM)
sh.setLevel(logger_level)
sh.setFormatter(formatter)
logger.addHandler(sh)

print(logger.info("error hello: {}".format(int(time.time()))))
print(logger.info("hello: {}".format(int(time.time()))))
