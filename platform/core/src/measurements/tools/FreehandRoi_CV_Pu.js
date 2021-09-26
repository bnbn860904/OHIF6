const displayFunction = data => {
  let coorValue = '';

  coorValue = data.PatientID;
  return coorValue;
};



export const FreehandRoi_CV_Pu = {
  id: 'FreehandRoi_CV_Pu',
  name: 'Freehand',
  toolGroup: 'allTools',
  cornerstoneToolType: 'FreehandRoi_CV_Pu',
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
