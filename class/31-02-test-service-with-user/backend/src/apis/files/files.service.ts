import { Injectable } from '@nestjs/common';
import { IFilesServiceUpload } from './interfaces/files-service.interface';
import { Storage } from '@google-cloud/storage';
@Injectable()
export class FilesService {
  async upload({ files }: IFilesServiceUpload): Promise<string[]> {
    console.log(files);

    const waitedFiles = await Promise.all(files);
    console.log(waitedFiles); // [File, File]
    // 1. 파일을 클라우드 스토리지에 저장하는 로직

    // 1-1) 스토리지 셋팅하기
    const bucket = 'yeji-storage';
    const storage = new Storage({
      projectId: 'secret-cipher-370305',
      keyFilename: 'gcp-file-storage.json',
    }).bucket(bucket);

    // 1-2) 스토리지에 파일 올리기

    const results = await Promise.all(
      waitedFiles.map(
        (el) =>
          new Promise<string>((resolve, reject) => {
            el.createReadStream()
              .pipe(storage.file(el.filename).createWriteStream())
              .on('finish', () => resolve(`${bucket}/${el.filename}`))
              .on('error', () => reject('실패'));
          }),
      ),

      // new Promise<string>((resolve, reject) => {
      //   files[0]
      //     .createReadStream()
      //     .pipe(storage.file(files[0].filename).createWriteStream())
      //     .on('finish', () => resolve(`버킷명/${files[0].filename}`))
      //     .on('error', () => reject('실패'));
      // }),

      // new Promise<string>((resolve, reject) => {
      //   files[1]
      //     .createReadStream()
      //     .pipe(storage.file(files[1].filename).createWriteStream())
      //     .on('finish', () => resolve(`버킷명/${files[0].filename}`))
      //     .on('error', () => reject('실패'));
      // }),
    );

    // files
    //   .createReadStream() // 읽기
    //   .pipe(storage.file(files.filename).createWriteStream()) //쓰기
    //   .on('finish', () => console.log('성공'))
    //   .on('error', () => console.log('실패'));
    // });

    // 2. 다운로드URL 브라우저에 돌려주기

    return results;
  }
}
