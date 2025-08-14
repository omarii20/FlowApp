import { router } from "expo-router";

type UpdateProfileParams = {
    phoneNumber: string;
    firstName: string;
    lastName: string;
    birthDate: string;
    gender: string;
    image?: string | null;
};

type UpdateProfileResult = {
    success: boolean;
    message?: string;
    error?: string;
};
    
export const updateProfile = async (params: UpdateProfileParams) => {
    const _phoneNumber = params.phoneNumber.startsWith("+972") ? "0" + params.phoneNumber.slice(4) : params.phoneNumber;
    const body = new URLSearchParams();
    body.append("phoneNumber", _phoneNumber);
    if (params.firstName) body.append("firstName", params.firstName);
    if (params.lastName) body.append("lastName", params.lastName);
    if (params.birthDate) body.append("birthDate", params.birthDate);
    if (params.gender) body.append("gender", params.gender);
    if (params.image) body.append("image", params.image);
    
    try {
        const response = await fetch(`https://crm.comarkit.com/api/flow/userProfile.php?phoneNumber=${_phoneNumber}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            },
            body: body.toString(),
        });

        const result = await response.json();
        return {
            success: !!result.success,
            message: result.message,
            error: result.error,
        };
    } catch (error) {
        console.error("❌ Failed to update profile:", error);
        return {
            success: false,
            error: "Network error while updating profile",
          };
    }
};
    