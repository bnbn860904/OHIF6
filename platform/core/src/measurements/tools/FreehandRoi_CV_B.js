const displayFunction = data => {
  let coorValue = '';

  coorValue = data.PatientID;
  return coorValue;
};



export const FreehandRoi_CV_B = {
  id: 'FreehandRoi_CV_B',
  name: 'Freehand',
  toolGroup: 'allTools',
  cornerstoneToolType: 'FreehandRoi_CV_B',
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
