export const uploadToCloudinary=async(image)=>{
    if (image) {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "instagram");
        data.append("cloud_name", "dtz0s3ruo");

        try {
            const res = await fetch("https://api.cloudinary.com/v1_1/dtz0s3ruo/image/upload", {
                method: "POST",
                body: data
            });

            const fileData = await res.json();
            console.log("fileData: ", fileData);

            // 'url' özelliğinin varlığını kontrol edin
            if (fileData.url) {
                return fileData.url.toString();
            } else {
                // 'url' bulunamadı, hata mesajını loglayın veya kullanıcıya gösterin
                console.error("Cloudinary URL not found in response");
                return null;
            }
        } catch (error) {
            console.error("Error uploading to Cloudinary: ", error);
            return null;
        }
    }
};

   /* if(image){
        const data = new FormData();
        data.append("file",image);
        data.append("upload_preset","instagram")
        data.append("cloud_name","dat8mzqnw")


        const res=await fetch("https://api.cloudinary.com/v1_1/dat8mzqnw/image/upload",{
            method:"POST",
            body:data
        })

        const fileData=await res.json();
        console.log("fileData: ",fileData)
        return fileData.url.toString();
    }
}*/