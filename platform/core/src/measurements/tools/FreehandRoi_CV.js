const displayFunction = data => {
  let coorValue = '';

  coorValue = data.PatientID;
  return coorValue;
};



export const FreehandRoi_CV = {
  id: 'FreehandRoi_CV',
  name: 'Freehand',
  toolGroup: 'allTools',
  cornerstoneToolType: 'FreehandRoi_CV',
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
