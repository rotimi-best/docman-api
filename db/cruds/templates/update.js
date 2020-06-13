module.exports = (mongooseModel, findField, setField) => {
    return new Promise((resolve, reject) => {
        const [setFieldVals] = Object.keys(setField);
        let setter = {};

        if (setFieldVals.includes('$')) {
            setter = setField;
        } else {
            setter = { $set: setField }
        }

        mongooseModel.updateMany(findField, setter, (err, res) => {
            if (err) reject(`Error updating a Text field ${err}`)

            resolve(res)
        })
    })
}
