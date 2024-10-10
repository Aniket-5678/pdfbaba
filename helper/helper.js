import bcrypt from "bcrypt"



export const hashedPassword = async(password) => {
    try {
         const saltRounds = 10;

         const hashpass = await bcrypt.hash(password, saltRounds)

         return hashpass
    } catch (error) {
        console.log(error);
    }
}


export const comparePassword = async(password, hashpass) => {
    try {
         const comparepass = await bcrypt.compare(password, hashpass)

         return comparepass
    } catch (error) {
        console.log(error);
    }
}
