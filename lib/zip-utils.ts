
import JSZip from "jszip";
import { saveAs } from "file-saver";

export const downloadZip = async (images: { url: string; name: string }[]) => {
    const zip = new JSZip();

    // Create a folder for the images
    const folder = zip.folder("blocket_photos");

    if (!folder) {
        throw new Error("Failed to create zip folder");
    }

    // Fetch each image and add to zip
    const promises = images.map(async (img, index) => {
        try {
            const response = await fetch(img.url);
            const blob = await response.blob();

            // Ensure unique names or use index
            const fileName = img.name || `photo_${index + 1}.jpg`;
            folder.file(fileName, blob);
        } catch (error) {
            console.error(`Failed to add image ${img.name} to zip:`, error);
        }
    });

    await Promise.all(promises);

    // Generate and save
    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, "blocket_ready_photos.zip");
};
