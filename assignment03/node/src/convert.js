import fs from "node:fs";
import exceljs from "exceljs";
const { Workbook } = exceljs;
import dayjs from "dayjs";

function loadJSON(path) {
  const contents = fs.readFileSync(path, "utf8");
  return JSON.parse(contents);
}

async function createExcel(data, outputPath) {
  // Setup the workbook and sheets
  const workbook = new Workbook();
  const coversheet = workbook.addWorksheet("Cover");
  const now = dayjs();

  // Process the data and write it to the sheets
  for (const record of data) {
    const {
      record_id: recordID,
      semester,
      student_name: studentName,
      bu_id: buID,
      program_of_study: programOfStudy,
      courses,
    } = record;

    if (
      [recordID, semester, studentName, buID, programOfStudy, courses].some(
        (element) => element === undefined,
      )
    ) {
      const safe_recordID = recordID ?? "(No record id)";
      throw new Error(
        `Record ${safe_recordID} is unparseable, please ensure` +
          "all keys are defined appropriately.",
      );
    }
    const sheet = workbook.addWorksheet(`${recordID}`);

    // Create metadata rows
    let r1 = sheet.getRow(1);
    r1.getCell(1).value = `${studentName}`;
    r1.getCell(2).value = `${buID}`;
    r1.getCell(3).value = `${programOfStudy}`;

    let r2 = sheet.getRow(2);
    r2.getCell(1).value = `${courses.length}`;

    // For each course, make a row for that course
    // Yet one more loop...
    if (!Array.isArray(courses)) {
      throw new Error("Courses passed were not in a list.");
    }

    let courserow = 4;
    for (let index = 0; index < courses.length; index++) {
      const course = courses[index];
      const {
        course_id: courseID,
        course_name: courseName,
        course_section: courseSection,
        start_time: startTime,
        duration,
        building_code: buildingCode,
        room_number: roomNumber,
        course_credits: courseCredits,
      } = course;

      if (
        [
          courseID,
          courseName,
          courseSection,
          startTime,
          duration,
          buildingCode,
          roomNumber,
          courseCredits,
        ].some((element) => element == undefined)
      ) {
        throw new Error("Course data is incorrectly defined.");
      }

      let rn = sheet.getRow(courserow + index);
      rn.getCell(1).value = courseID;
      rn.getCell(2).value = courseName;
      rn.getCell(3).value = courseSection;
      rn.getCell(4).value = startTime;
      rn.getCell(5).value = duration;
      rn.getCell(6).value = buildingCode;
      rn.getCell(7).value = roomNumber;
      rn.getCell(8).value = courseCredits;
    }
  }

  // Coversheet
  let csr1 = coversheet.getRow(1);
  csr1.getCell(1).font = { bold: true };
  csr1.getCell(1).value = "Fall 2024";

  let csr2 = coversheet.getRow(2);
  csr2.getCell(1).font = { bold: true };
  csr2.getCell(1).value = "Number of students:";
  csr2.getCell(2).value = data.length;

  let csr3 = coversheet.getRow(3);
  csr3.getCell(1).font = { bold: true };
  csr3.getCell(1).value = "Report generated on";
  csr3.getCell(2).value = now.format("MM/DD/YYYY @HH:mm:ss");

  // Save out
  const filename = `C1__${now.format("MM_DD_YYYY_HH_mm_ss")}`;
  await workbook.xlsx.writeFile(`${outputPath}/${filename}.xlsx`);
}

function processFileAndSaveTo(outputPath) {
  return (path) => {
    const data = loadJSON(path);

    if (!Array.isArray(data)) {
      console.log(
        "Expected an array of student data but received an object." +
          ` Please wrap the input file ${path} with '[]' to ensure ` +
          "it is the correct type.",
      );
      return;
    }

    createExcel(data, outputPath);
  };
}

export { processFileAndSaveTo };
