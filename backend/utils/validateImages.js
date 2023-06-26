const imageValidate = (images) => {
  let imagesTable = [];

  // If admin downloaded several images at once...
  if (Array.isArray(images)) {
    imagesTable = images;
  } else {
    // If it was just one image
    imagesTable.push(images);
  }

  if (imagesTable.length > 3) {
    return { error: "Send only 3 images at once" };
  }

  for (let image of imagesTable) {
    // if image size > 1 MB
    if (image.size > 1048576) return { error: "Size too large (above 1 MB)" }; 

    // make sure that images have the following extensions:
    const filetypes = /jpg|jpeg|png/;
    const mimetype = filetypes.test(image.mimetype);
    if (!mimetype)
      return { error: "Incorrect mime type (should be jpg,jpeg or png" };
  }

  return { error: false };
};

module.exports = imageValidate;
