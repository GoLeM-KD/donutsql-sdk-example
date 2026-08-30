import { DonutTypes } from "donutsql";
import { connectDatabase } from "../../lib/db";
/*
    Theres the use of query function with parameters and 
    Without parameters.
*/

// Without parameters
export async function GET(req) {
  try {
    const pool = await connectDatabase();

    const results = await pool.query("SELECT * FROM TABLE_ONE"); // You can call the query function without any parameter like this
    // ex:- query('your query')
    console.log("RESULTSSS..", results.result.recordset);
    return new Response(
      JSON.stringify({ success: true, results: results.result.recordset }),
      { status: 200 },
    );
  } catch (err) {
    console.log("MAIN GET...", err);
    return new Response(
      JSON.stringify({ success: false, Error: "Internal Server Error" }),
      { status: 500 },
    );
  }
}

// These two methods are for examples of query function with parameters
export async function POST(req) {
  try {
    const FormData = await req.formData();
    const name = FormData.get("name");

    const pool = await connectDatabase();

    // Here, I have used a parameter named p1.
    await pool.query("INSERT INTO TABLE_ONE(Name) VALUES (@p1)", {
      p1: {
        type: DonutTypes.VarChar(),
        value: name,
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
        
        2. Make sure you use the same name for the property name as the 
            parameter name when defining its type and value. 
        
            For example, if you use "param1" as the parameter name,
            the property name must also be "param1". 
    */

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.log("INSERT ERROR...", err);
    return new Response(
      { success: false, Error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function DELETE(req) {
  try {
    const FormData = await req.formData();

    const id = FormData.get("id");

    const pool = await connectDatabase();

    await pool.query("DELETE FROM TABLE_ONE WHERE id = @id", {
      id: {
        type: DonutTypes.Int(),
        value: id,
      },
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.log("DELETE ERROR...", err);
    return new Response(
      JSON.stringify({ success: false, Error: "Internal Server Error" }),
      { status: 500 },
    );
  }
}
