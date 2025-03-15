// import { SelectChangeEvent } from "@mui/material";
import { ChangeEvent, useEffect, useMemo, useState } from "react"

export const useForm = <T>( initialForm:any, formValidations:any = {} ) => {

    const [ formState, setFormState ] = useState(initialForm);
    const [ formValidation, setFormValidation ] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        createValidators();
    }, [ formState ]);

    useEffect(() => {
        setFormState( initialForm );
    }, [ initialForm ])
    
    const isFormValid = useMemo( () => {

        for (const formValue of Object.keys( formValidation )) {
            if ( formValidation[formValue] !== null ) return false;
        }

        return true;
    }, [ formValidation ])


    const onInputChange = ({ target } : ChangeEvent<HTMLInputElement>) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [ name ]: value
        });
    }

    const onResetForm = () => {
        setFormState( initialForm );
    }

    //  // onChange para select
    //  const onSelectChange = (event: SelectChangeEvent) => {
    //     setFormState(prev => ({
    //         ...prev,
    //         [event.target.name]: event.target.value
    //     }));
    // };

    const createValidators = () => {
        
        const formCheckedValues:any = {};

        for (const formField of Object.keys( formValidations )) {
            const [ fn, errorMessage ] = formValidations[formField];
            formCheckedValues[`${ formField }Valid`] = fn( formState[formField] ) ? null : errorMessage;
        }

        setFormValidation( formCheckedValues );
    }
    
    return {
        ...formState
        //PROPERTIES
        ,formState
        ,formValidation

        //METHODS
        ,onInputChange
        ,onResetForm
        ,createValidators
        ,...formValidation
        ,isFormValid
     }
}
