# 컴퓨터 만드는 설명서 

# 1. 운영체제 설치 (node 14버전과 npm과 yarn이 모두 설치되어 있는 리눅스)
#FROM node:14

#RUN mkdir qqq 
#폴더만들기 

# 2. 내 컴퓨터에 있는 폴더나 파일을 도커 컴퓨터 안으로 복사 
#COPY ./index.js /qqq/index.js
# 현폴더의 인덱스 파일을 qqq폴더로 집어 넣어라 

#docker build

#docker RUN
#RUN node index.js
#최적화 포함해서 이미지 저장

# 3. 도커 안에서 index.js 실행 
#CMD node index.js



# 컴퓨터 만드는 설명서

# 1. 운영체제 설치(node ver.14, npm, yarn이 모두 설치되어 있는 리눅스)
FROM node:14

# 2. 내 컴퓨터에 있는 폴더나 파일을 docker computer 안으로 복사하기
COPY ./package.json /myfolder/
COPY ./yarn.lock /myfolder/
WORKDIR /myfolder/
#마우스 옮겨주기 
RUN yarn install
#copy 위치를 조정함으로써 캐시를 사용해서 설치속도 향상(단, package.json이 변경되면 사용 x)


RUN mkdir myfolder
COPY . /myfolder/


# 3. 도커 안에서 index.js 실행시키기
CMD yarn start:dev


