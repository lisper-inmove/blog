shell := /bin/bash
e:
	@if [ -d posts ]; then \
		unlink posts; \
	fi
	ln -s $(HOME)/posts .
	python extract.py

build:
	@if [ -d posts ]; then \
		unlink posts; \
	fi
	ln -s $(HOME)/posts .
	rm -rf .next
	cp .env.prod .env
	npm run build

dev: e
	cp .env.dev .env
	NEXT_PUBLIC_HOST=http://192.168.200.124:3000 npm run dev

start:
	npm run start

bd: e build # build docker
	@if [ -d posts ]; then \
		unlink posts; \
	fi
	ln -s $(HOME)/posts .
	sudo nerdctl build -t blog:v2.0 .
	sudo nerdctl save -o blog.tar blog:v2.0
	scp blog.tar inmove@mini:/home/inmove/volumn1/code/blog
	sudo rm blog.tar
