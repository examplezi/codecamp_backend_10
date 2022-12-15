// HINT
//const { Storage } = require("@google-cloud/storage");
const { Storage } = require("@google-cloud/storage");
const sharp = require("sharp"); // 큰 이미지들을 작은 이미지들로 변환해주는 라이브러리

exports.ThumbnailTrigger = async (event, context) => {
  // context는 없어도됨
  if (event.name.includes("thumb/")) return; //이미지이 사이즈 조건을 제한

  const option = [
    //사이즈에 각각 접근해주기 위해 배열로 선언
    //
    [320, "s"],
    [640, "m"],
    [1280, "l"],
  ];

  const name = event.name;

  const storage = new Storage().bucket(event.bucket); // 스로리지 초기화

  await Promise.all(
    option.map(([size, dir]) => {
      // option으로 받은 이미지 사이즈들을 mapping으로 하나하나 접근
      return new Promise((resolve, reject) => {
        storage
          .file(name)
          .createReadStream() //readable 데이터를 호출하여 데이터를 읽음
          .pipe(sharp().resize({ width: size })) //pipe( )  여러개의 스트림 이어주기
          .pipe(storage.file(`thumb/${dir}/${name}`).createWriteStream()) // Writable 스트림을 만들어서 반환
          .on("finish", () => resolve()) // 동기 작업(promise.all)이 성공되었다는 의미
          .on("error", () => reject()); // 동기 작업(promise.all)이  실패했다는 의미
      });
    })
  );
};
