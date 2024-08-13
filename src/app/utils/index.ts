export const getAnchor = (hl7: any, type: string): any => {
    for (let data_struct of hl7.data_structs) {
        if (data_struct.data_structure == type) {
            return data_struct
        }
    }

    for (let msg_struct_id of hl7.msg_struct_ids) {
        if (msg_struct_id.message_structure == type) {
            return msg_struct_id
        }
    }

    for (let event of hl7.events) {
        if (event.event_code == type) {
            return event
        }
    }
    return null
}

export const isValidBase64Image = async (base64Data: string) => {
    // Create a regular expression to check base64 format
    try {
        if (base64Data == "" || base64Data == null) return false
        // Decode the base64 string
        const binaryString = atob(base64Data);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);

        for (let i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }

        // Create a Blob from the byte array
        const blob = new Blob([bytes], { type: "image/png" });

        // Create an Image object
        const img = new Image();

        return await new Promise<boolean>((resolve) => {
            img.onload = () => resolve(true);  // If image loads, it's valid
            img.onerror = () => resolve(false); // If there's an error, it's invalid

            // Create a URL for the Blob and set it as the image source
            img.src = URL.createObjectURL(blob);
        });
    } catch (error) {
        // If there's an error decoding the base64 string, it's invalid
        return false;
    }

}
export const isValidBase64PDF = async (base64Data: string): Promise<boolean> => {
    try {
        if (base64Data === "" || base64Data === null) return false;

        // Decode the base64 string
        const binaryString = atob(base64Data);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);

        for (let i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }

        // Check the first few bytes for the PDF header
        const header = String.fromCharCode(...bytes.slice(0, 5));

        return header === '%PDF-';
    } catch (error) {
        // If there's an error decoding the base64 string, it's invalid
        return false;
    }
}