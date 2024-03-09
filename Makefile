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
	npm run build

dev: e
	NEXT_PUBLIC_HOST=http://192.168.3.124:3000 npm run dev
start:
	npm run start

bd: e build # build docker
	@if [ -d posts ]; then \
		unlink posts; \
	fi
	ln -s $(HOME)/posts .
	sudo docker build -t mh.com:8890/blog/blog:v2.0 .
	sudo docker push mh.com:8890/blog/blog:v2.0

rd: # restart docker
	sudo docker stop blog_v2
	sudo docker rm blog_v2
	sudo docker run --restart always -d --name blog_v2 -p 9528:3000 -v $(HOME)/posts:/app/posts mh.com:8890/blog/blog:v2.0

sd:
	sudo docker run --restart always -d --name blog_v2 -p 9528:3000 mh.com:8890/blog/blog:v2.0
