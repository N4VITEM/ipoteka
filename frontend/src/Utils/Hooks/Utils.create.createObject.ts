import { useMutation } from "@apollo/client";
import { useEffect } from "react";
import { Project } from "../../Interfaces/Project.interface";
import { CREATE_OBJECT } from "../../GraphQL/Object.query";

export default function useCreateObject(object: Project | undefined) {
    const [createObject, { data, error }] = useMutation(CREATE_OBJECT);

    useEffect(() => {
        if (object !== undefined){
            createObject({
                variables: {
                    createObjectDTO: object
                }
            }).catch(console.error).then(() => window.location.reload());
        }
    }, [object, createObject])
    
    return {
        result: data ? data.createObject : undefined,
        error
    };
}
