e:
	python extract.py
build:
	npm run build

dev: e
	npm run dev
start:
	npm run start

bd: e build # build docker
	sudo docker build -t mh.com:8890/blog/blog:v2.0 .
	sudo docker push mh.com:8890/blog/blog:v2.0

rd: # restart docker
	sudo docker stop blog_v2
	sudo docker rm blog_v2
	sudo docker run --restart always -d --name blog_v2 -p 9528:3000 mh.com:8890/blog/blog:v2.0

sd:
	sudo docker run --restart always -d --name blog_v2 -p 9528:3000 mh.com:8890/blog/blog:v2.0
