import { BadRequestException } from '@nestjs/common'
import { ValidationError } from 'class-validator'

export default (errors: ValidationError[]): any => {
    const validationResult = getConstraints(errors)
    throw new BadRequestException({
        errorType: 'ClassValidation',
        validationResult,
    })
}

function getConstraints(errors: ValidationError[]) {
    const constraintsList: any[] = []
    errors.forEach(err => {
        extractConstraints(err, err.property, constraintsList)
    })

    return constraintsList
}

function extractConstraints(
    error: ValidationError,
    ancestor: string,
    constraintsList: any[],
) {
    if (!error.children.length) {
        const constraints = error.constraints as any
        constraintsList.push({
            property: ancestor,
            validations: Object.keys(constraints).map(key => constraints[key]),
        })
    } else {
        error.children.forEach(err => {
            extractConstraints(
                err,
                `${ancestor}.${err.property}`,
                constraintsList,
            )
        })
    }
}
