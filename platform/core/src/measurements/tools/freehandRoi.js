const displayFunction = data => {
  let coorValue = '';

  coorValue = data.PatientID + 'kk';
  return coorValue;
};



export const freehandRoi = {
  id: 'FreehandRoi',
  name: 'Freehand',
  toolGroup: 'allTools',
  cornerstoneToolType: 'FreehandRoi',
  options: {
    measurementTable: {
      displayFunction,
    },
    caseProgress: {
      include: true,
      evaluate: true,
    },
  },
};
