const { disconnect_db, RegisterModel } = require("./db_schematics");


const check_data_by_email = async (data) => {
    const queryResp = await RegisterModel.findOne({ email: data})
    return queryResp;
}
const single_insert_data = async (data) => {
    try {
        const is_data_duplicate = await check_data_by_email(data.email);
        console.log("...is  data duplicated ...", is_data_duplicate);
        if (is_data_duplicate !== null) {
            return "duplicate";
        }else {
            const queryResp = await RegisterModel.insertMany(
                {
                    email: data.email,
                    first_name: data.first_name,
                    surname: data.surname,
                    middel_name: data.middel_name,
                    tel: data.tel,
                    staff_id: data.staff_id,
                    date_of_birth: data.date_of_birth,
                    department: data.department,
                    photo: data.photo,
                    password: data.password,
                }
            );
            return queryResp
        }
        //return resp
    } catch (error) {
        console.log("..ERROR IN INSERTING DATA INTO DB (SINGLY)..::", error);
        if (error._message.includes("validation failed")) {
            return err
        }
    }
    finally {
        //disconnect_db()
    }
}

module.exports = { 
    single_insert_data
 }