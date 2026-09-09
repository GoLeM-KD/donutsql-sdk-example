import { connectDatabase } from "@/lib/db";
import { DonutTypes } from "donutsql";
/*
    Example for database transaction
*/
export async function POST(req) {
  try {
    const FormData = await req.formData();
    const transactionDatas = JSON.parse(FormData.get("data"));

    const pool = await connectDatabase(); // Connecting the database

    /*
        after connecting the database you can call transaction function
        and you can do multiple transactions as below.
    */
    await pool.transaction((tx) => {
      tx.query(`INSERT INTO student(name, age) VALUES (@name, @age)`, {
        age: {
          type: DonutTypes.Int(),
          value: transactionDatas.table1.age,
        },
        name: {
          type: DonutTypes.NVarChar(),
          value: transactionDatas.table1.name,
        },
      });

      tx.query(`INSERT INTO subject(name) VALUES (@sub)`, {
        sub: {
          type: DonutTypes.Text(),
          value: transactionDatas.table2.subName,
        },
      });

      tx.query(`DELETE FROM subject WHERE subjectID = @param`, {
        param: {
          type: DonutTypes.Int(),
          value: transactionDatas.table2.id,
        },
      });
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.log("TRANSACTION ERROR...", err);
    return new Response(
      JSON.stringify({
        success: false,
        Error: "Internal Server Error",
        message: err.message,
      }),
      { status: 500 },
    );
  }
}
