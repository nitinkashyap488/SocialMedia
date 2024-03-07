export const uploadToCloudinary = async (pics) => {
  if (pics) {
    const data = new FormData();
    data.append("file", pics);
    data.append("upload_preset", "instagram");
    data.append("cloud_name", "duzedwnes");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/duzedwnes/image/upload",
      {
        method: "post",
        body: data,
      }
    );

    if (res.ok) {
      const fileData = await res.json();
      if (fileData.url) {
        console.log("url : ", fileData.url.toString());
        return fileData.url.toString();
      } else {
        console.log("Error: URL not found in Cloudinary response");
        return null;
      }
    } else {
      console.log("Error:", res.status, res.statusText);
      return null;
    }
  } else {
    console.log("Error: No picture provided");
    return null;
  }
};
