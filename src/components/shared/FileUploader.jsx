import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { convertFileToUrl } from "@/lib/utils";

const FileUploader = ({ fieldChange, mediaUrl }) => {
    const [file, setFile] = useState([]);
    const [fileUrl, setFileUrl] = useState(mediaUrl);

    // Convert file to url
    const onDrop = useCallback(
        (acceptedFiles) => {
            setFile(acceptedFiles); // Set the file state 
            fieldChange(acceptedFiles); // Set the file state in the parent component
            setFileUrl(convertFileToUrl(acceptedFiles[0])); // Set the file url state
        },
        [file]
    );

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            "image/*": [".png", ".jpeg", ".jpg"],
        },
    });

    return (
        <div {...getRootProps()}
            className="flex flex-center flex-col rounded-xl cursor-pointer">
            <input {...getInputProps()} className="cursor-pointer" />

            {/* If there is a file url, display the image */}
            {fileUrl ? 
            (
                <>
                    <div className="flex flex-1 justify-center w-full p-5 lg:p-10">
                        <img src={fileUrl} alt="image" className="file_uploader-img" />
                    </div>
                    <p className="file_uploader-label">Click or drag photo to replace</p>
                </>
            ) : (
                // If there is no file url, display the file uploader
                <div className="file_uploader-box">
                    <Button type="button" className="shad-button_dark_4">
                        Upload Event Image
                    </Button>
                    <p className="text-primary-foreground/50 small-regular mt-6">SVG, PNG, JPG</p>
                </div>
            )}
        </div>
    );
}

export default FileUploader
