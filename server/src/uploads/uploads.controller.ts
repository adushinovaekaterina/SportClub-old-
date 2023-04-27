import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, Redirect, HttpStatus, Query, Header, Headers, Res } from '@nestjs/common';
import { UploadsService } from './uploads.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { EventsService } from 'src/events/events.service';
import * as ExcelJS from 'exceljs';
import { createReadStream } from 'fs';
import { Workbook } from 'exceljs';
import { Response } from 'express';


@Controller('uploads')
export class UploadsController {
  constructor(
    private readonly uploadsService: UploadsService,
    private readonly eventsService: EventsService) { }

  @Post()
  @ApiOperation({ summary: "Сохранение файла на сервере" })
  @ApiResponse({ status: HttpStatus.OK, description: "Успешно" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file) {

    // console.log(file)
    let path = await this.uploadsService.uploadFile(file)

    return path
  }


  @Get("file_buffer")
  @ApiOperation({ summary: "Получение файла с сервера в виде буфера" })
  @ApiParam({ name: 'path', description: "путь к файлу для сохранения" })
  @ApiResponse({ status: HttpStatus.OK, description: "Успешно" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  async getFileBuffer(@Query() params) {

    // console.log(params.path)
    let file = await this.uploadsService.getFileBuffer(params.path)

    return file
  }

  @Get("image_base64")
  @ApiOperation({ summary: "Получение файла с сервера в виде base64 для изображений" })
  @ApiParam({ name: 'path', description: "путь к файлу для сохранения" })
  @ApiResponse({ status: HttpStatus.OK, description: "Успешно" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  async getFileImageBase64(@Query() params) {

    // console.log(params.path)
    let base64 = await this.uploadsService.getFileImageBase64(params.path)

    return base64
  }


  // reports--------------------------------------------------------------------------
  //get excel file about events
  @Get("excel/events_direction")
  @Header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
  @Header('Content-Disposition', 'attachment; filename=data.xlsx')
  @ApiOperation({ summary: "Получение файла excel по мероприятиям направления " })
  @ApiResponse({ status: HttpStatus.OK, description: "Успешно" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  async getReportEventsOfDirection(@Res() res: Response, @Query() { type = null, level = null,
    direction = null, dateStart = null, dateEnd = null }) {

    let dStart: Date = dateStart == null ? null : (new Date(dateStart))
    let dEnd: Date = dateEnd == null ? null : (new Date(dateEnd))

    // получить все мероприятия по заданным параметрам
    let events = await this.eventsService.findAllEvents(null, type, level, direction, dStart, dEnd)

    await this.uploadsService.getReportEventsOfDirection(res, events[0], events[1],  {type:type, level:level, direction:direction, dateStart:dStart, dateEnd:dEnd})
    //return res
  }

  // @Get("excel/events_direction")
  // async downloadExcel(@Res() res: Response) {
  //   const workbook = new Workbook();
  //   const worksheet = workbook.addWorksheet('My Sheet');

  //   // Add some data to the worksheet
  //   worksheet.addRow(['Name', 'Age']);
  //   worksheet.addRow(['John Doe', 30]);
  //   worksheet.addRow(['Jane Doe', 25]);

  //   // Set the headers and disposition
  //   res.setHeader(
  //     'Content-Type',
  //     'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  //   );
  //   res.setHeader(
  //     'Content-Disposition',
  //     'attachment; filename=' + 'my_excel_file.xlsx',
  //   );

  //   // Send the workbook as a response
  //   await workbook.xlsx.writeFile
  //   res.end();
  // }

}
