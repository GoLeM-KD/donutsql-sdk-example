import { connectDatabase } from "@/lib/db";
import { DonutTypes } from "donutsql";
/*
    Theres the use of execute function with parameters and 
    Without parameters.
*/
// Without paramters
export async function GET(req) {
  try {
    const pool = await connectDatabase(); // connect the database

    /*
        Stored procedure script:
            CREATE PROCEDURE get_names_of_students_and_their_subjects
            AS
            BEGIN
                SET NOCOUNT ON;
                SELECT stud.name AS student_Name,
                        sub.name AS subject_Name
                FROM student AS stud
                INNER JOIN user_subject AS us
                ON us.studentID = stud.id
                INNER JOIN subject AS sub
                ON us.subjectID = sub.subjectID;
            END;
    */

    // You can execute a stored procedure using the execute function as shown below.
    const result = await pool.execute(
      "get_names_of_students_and_their_subjects",
    );
    // ex:- execute(procedure_name)
    return new Response(
      JSON.stringify({ success: true, result: result.result.recordset }),
    );
  } catch (err) {
    console.log("PROCEDURE WITHOUT PARAMETER...", err);
    return new Response(
      JSON.stringify({ success: false, Error: "Internal Server Error" }),
      { status: 500 },
    );
  }
}

// With parameters
export async function POST(req) {
  try {
    const FormData = await req.formData();
    const procedureData = JSON.parse(FormData.get("procedureDatas"));

    const pool = await connectDatabase();

    /*
        stored procedure script:
            CREATE PROCEDURE insert_students_subjects
                @sid INT ,
                @subid INT 
            AS
            BEGIN
                SET NOCOUNT ON;
                INSERT INTO user_subject (studentID, subjectID) VALUES (@sid, @subid);
            END;
    */

    // Here, I have used two parameters named sid and subid.
    await pool.execute("insert_students_subjects", {
      sid: {
        type: DonutTypes.Int(),
        value: procedureData.studentID,
      },
      subid: {
        type: DonutTypes.Int(),
        value: procedureData.subjectID,
      },
    });
    /*
        1. When using parameters, you mainly need to provide two properties: 
            the type and the value. 
        
            To define the data type of a parameter, you must import the 
            DonutTypes class and then use the appropriate type function. 
        
            Examples: 
                DonutTypes.Int() 
                DonutTypes.NvarChar() 
        
        2. Make sure the property names match the parameter names in 
            the stored procedure and are defined in the correct order.

            Example: 
                The stored procedure above has two parameters: sid and subid, 
                in that order.
                
                The property names below use the same names as the stored
                procedure parameters and are defined in the same order.
    */
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.log("PROCEDURE ERROR...", err);
    return new Response(
      JSON.stringify({ success: false, Error: "Internal Server Error" }),
      { status: 500 },
    );
  }
}

