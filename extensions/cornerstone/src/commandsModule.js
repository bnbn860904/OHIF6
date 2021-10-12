import cornerstone from 'cornerstone-core';
import cornerstoneTools from 'cornerstone-tools';
import OHIF from '@ohif/core';

import setCornerstoneLayout from './utils/setCornerstoneLayout.js';
import { getEnabledElement } from './state';
import CornerstoneViewportDownloadForm from './CornerstoneViewportDownloadForm';

//
import test from './test.js';
import total3D from './total3D.js';
//


const scroll = cornerstoneTools.import('util/scroll');

const { studyMetadataManager } = OHIF.utils;
const { setViewportSpecificData } = OHIF.redux.actions;
const { getSeriesInfo } = OHIF.studies;

const refreshCornerstoneViewports = () => {
  cornerstone.getEnabledElements().forEach(enabledElement => {
    if (enabledElement.image) {
      cornerstone.updateImage(enabledElement.element);
	  console.log(enabledElement.image.imageId);
	  
	  //////////////////////////////
	  var patient_id = (enabledElement.image.imageId).split("/");
	  var patient_id = patient_id[2] + "-" + patient_id[3] + "-" + patient_id[4] + "-" + patient_id[5] + "-" + patient_id[6] + "-" + patient_id[7];
	  var dataUrl= "http://127.0.0.1:5000/pre_upload?number=" + patient_id;
	  var xhr = new XMLHttpRequest()
	  xhr.open('GET',dataUrl, true)
	  xhr.send()
	  var data;
	  xhr.onload = function(){
	  data = JSON.parse(this.responseText);}
	  //////////////////////////////
    }
  });
};

const commandsModule = ({ servicesManager }) => {
  const actions = {
    rotateViewport: ({ viewports, rotation }) => {
      const enabledElement = getEnabledElement(viewports.activeViewportIndex);

      if (enabledElement) {
        let viewport = cornerstone.getViewport(enabledElement);
        viewport.rotation += rotation;
        cornerstone.setViewport(enabledElement, viewport);
      }
    },
    flipViewportHorizontal: ({ viewports }) => {
      const enabledElement = getEnabledElement(viewports.activeViewportIndex);

      if (enabledElement) {
        let viewport = cornerstone.getViewport(enabledElement);
        viewport.hflip = !viewport.hflip;
        cornerstone.setViewport(enabledElement, viewport);
      }
    },
    flipViewportVertical: ({ viewports }) => {
      const enabledElement = getEnabledElement(viewports.activeViewportIndex);

      if (enabledElement) {
        let viewport = cornerstone.getViewport(enabledElement);
        viewport.vflip = !viewport.vflip;
        cornerstone.setViewport(enabledElement, viewport);
      }
    },
    scaleViewport: ({ direction, viewports }) => {
      const enabledElement = getEnabledElement(viewports.activeViewportIndex);
      const step = direction * 0.15;

      if (enabledElement) {
        if (step) {
          let viewport = cornerstone.getViewport(enabledElement);
          viewport.scale += step;
          cornerstone.setViewport(enabledElement, viewport);
        } else {
          cornerstone.fitToWindow(enabledElement);
        }
      }
    },
    resetViewport: ({ viewports }) => {
      const enabledElement = getEnabledElement(viewports.activeViewportIndex);

      if (enabledElement) {
        cornerstone.reset(enabledElement);
      }
    },
    invertViewport: ({ viewports }) => {
      const enabledElement = getEnabledElement(viewports.activeViewportIndex);

      if (enabledElement) {
        let viewport = cornerstone.getViewport(enabledElement);
        viewport.invert = !viewport.invert;
        cornerstone.setViewport(enabledElement, viewport);
      }
    },
    // TODO: this is receiving `evt` from `ToolbarRow`. We could use it to have
    //       better mouseButtonMask sets.
    setToolActive: ({ toolName }) => {
      if (!toolName) {
        console.warn('No toolname provided to setToolActive command');
      }
      cornerstoneTools.setToolActive(toolName, { mouseButtonMask: 1 });
    },
    clearAnnotations: ({ viewports }) => {
      const element = getEnabledElement(viewports.activeViewportIndex);
      if (!element) {
        return;
      }

      const enabledElement = cornerstone.getEnabledElement(element);
      if (!enabledElement || !enabledElement.image) {
        return;
      }

      const {
        toolState,
      } = cornerstoneTools.globalImageIdSpecificToolStateManager;
      if (
        !toolState ||
        toolState.hasOwnProperty(enabledElement.image.imageId) === false
      ) {
        return;
      }

      const imageIdToolState = toolState[enabledElement.image.imageId];

      const measurementsToRemove = [];

      Object.keys(imageIdToolState).forEach(toolType => {
        const { data } = imageIdToolState[toolType];

        data.forEach(measurementData => {
          const {
            _id,
            lesionNamingNumber,
            measurementNumber,
          } = measurementData;
          if (!_id) {
            return;
          }

          measurementsToRemove.push({
            toolType,
            _id,
            lesionNamingNumber,
            measurementNumber,
          });
        });
      });

      measurementsToRemove.forEach(measurementData => {
        OHIF.measurements.MeasurementHandlers.onRemoved({
          detail: {
            toolType: measurementData.toolType,
            measurementData,
          },
        });
      });
    },
    nextImage: ({ viewports }) => {
      const enabledElement = getEnabledElement(viewports.activeViewportIndex);
      scroll(enabledElement, 1);
    },
    previousImage: ({ viewports }) => {
      const enabledElement = getEnabledElement(viewports.activeViewportIndex);
      scroll(enabledElement, -1);
    },
    getActiveViewportEnabledElement: ({ viewports }) => {
      const enabledElement = getEnabledElement(viewports.activeViewportIndex);
      return enabledElement;
    },
	    //draw_test
	draw_test : ({ viewports }) => {
			
			cornerstoneTools.setToolActive('Brush2', { mouseButtonMask: 1 })
			
	},  	//draw_test
		    //draw_CV
	draw_CV : ({ viewports }) => {
		
		console.log('hi');

	
		cornerstoneTools.setToolActive('Brush3', { mouseButtonMask: 1 });

	
	},  	//draw_CV
	start_drawing : ({ viewports }) => {
		
	  console.log('hi');
	  var dataUrl= "http://127.0.0.1:5000/start_drawing";
	  var xhr = new XMLHttpRequest()
	  xhr.open('GET',dataUrl, true)
	  xhr.send()
	  var data ;
	  var input_file
	  xhr.onload = function(){
		data = JSON.parse(this.responseText);
		console.log(data);
		input_file = `http://127.0.0.1:5000/upload?number=volume99`
		test(input_file);
		}	
	},     //start-drawing
	
	total3D_drawing : ({ viewports }) => {
		
	    console.log('total3D_drawing');
		const element = getEnabledElement(viewports.activeViewportIndex);
		const enabledElement = cornerstone.getEnabledElement(element);
		console.log(enabledElement.image.imageId);
		
	    var patient_id = (enabledElement.image.imageId).split("/");
	    var patient_id = patient_id[2] + "-" + patient_id[3] + "-" + patient_id[4] + "-" + patient_id[5] + "-" + patient_id[6] + "-" + patient_id[7];		
		
		var dataUrl= "http://127.0.0.1:5000/dcm2vti?number=" + patient_id;		
		var xhr = new XMLHttpRequest()
		xhr.open('GET',dataUrl, true)
		xhr.send()
		var data;
		xhr.onload = function(){
			data = JSON.parse(this.responseText);
			console.log(data.series_id);
			//var input_file = `http://140.116.156.197:5000/upload_3D`
			var input_file = `http://127.0.0.1:5000/upload_3D?number=` + data.series_id;
			total3D(input_file);
			}
		/*var input_file
		input_file = `http://140.116.156.197:5000/upload_3D`
		total3D(input_file);*/
		
	},     //total3D_drawing
	Download_CV : ({ viewports }) => {
		
		console.log('hi');
		const element = getEnabledElement(viewports.activeViewportIndex);
		const enabledElement = cornerstone.getEnabledElement(element);		
	    var patient_id = (enabledElement.image.imageId).split("/");
	    patient_id = patient_id[5] + '-' + patient_id[7];
		var random = Math.random();
		var dataUrl= "http://127.0.0.1:5000/download_singleCV?number=" + patient_id + "&" + random;
		
		fetch(dataUrl).then(res => res.blob().then(blob => {
		var a = document.createElement('a');
		var url = window.URL.createObjectURL(blob);
		var filename = patient_id + '.json';
		a.href = url;
		a.download = filename;
		a.click();
		window.URL.revokeObjectURL(url);
		}))
	
	},  	//Download_CV
	
	Download_series : ({ viewports }) => {
		
		console.log('hi');
		const element = getEnabledElement(viewports.activeViewportIndex);
		const enabledElement = cornerstone.getEnabledElement(element);		
	    var patient_id = (enabledElement.image.imageId).split("/");
		var series_id  = patient_id[5];
	    patient_id = patient_id[5] + '-' + patient_id[7];
		var random = Math.random();
		var dataUrl= "http://127.0.0.1:5000/download_series?number=" + patient_id + "-" + random;
		
		fetch(dataUrl).then(res => res.blob().then(blob => {
		var a = document.createElement('a');
		var url = window.URL.createObjectURL(blob);
		var filename = series_id + '.zip';
		a.href = url;
		a.download = filename;
		a.click();
		window.URL.revokeObjectURL(url);
		}))
	
	},  	//Download_series
	
	Pre_execute_AI : ({ viewports }) => {
		
		console.log('hi');
		const element = getEnabledElement(viewports.activeViewportIndex);
		const enabledElement = cornerstone.getEnabledElement(element);		
	    var patient_id = (enabledElement.image.imageId).split("/");
		var series_id  = patient_id[5];
		var dataUrl= "http://127.0.0.1:5000/Pre_execute_AI?number=" + series_id;
		var xhr = new XMLHttpRequest()
		xhr.open('GET',dataUrl, true)
		xhr.send()
		var data ;
		xhr.onload = function(){
			data = JSON.parse(this.responseText);
			window.alert("Pre_execute_AI done !!");
		}		
		
	},  	//Pre_execute_AI
	
	Test : ({ viewports }) => {
		
		const element = getEnabledElement(viewports.activeViewportIndex);
		var toolState1 = cornerstoneTools.getToolState(element, 'FreehandRoi');
		var toolState2 = cornerstoneTools.getToolState(element, 'FreehandRoi_CV');
		var toolState3 = cornerstoneTools.getToolState(element, 'FreehandRoi_CV_B');
		var toolState4 = cornerstoneTools.getToolState(element, 'FreehandRoi_CV_Pu');
		var toolState5 = cornerstoneTools.getToolState(element, 'FreehandRoi_AI');
		var download_data = {};
		
		function getCoordinate(toolState){
		if(toolState == undefined){
			return [];
		}
		var coor = toolState.data;
		var data = [];				
		coor.forEach(function(coor){
			console.log(coor);
			var points = coor.handles.points			
			points.forEach(function(points){
			delete points.active
			delete points.highlight
			delete points.lines			
			});
			console.log(points);
			data.push(points)			
		});
			return data;
		};
		function getName(toolState){
		if(toolState == undefined){
			name = 'nothing'
			return name;
		}
		var name;
		if(toolState.data[0].test == ''){
			name = toolState.data[0].color;
		} else {
			name = toolState.data[0].test;
		}
			return name;
		}	
		
		var coordinate1 = getCoordinate(toolState1);
		var coordinate2 = getCoordinate(toolState2);
		var coordinate3 = getCoordinate(toolState3);
		var coordinate4 = getCoordinate(toolState4);
		var coordinate5 = getCoordinate(toolState5);
		var name2 = getName(toolState2);
		var name3 = getName(toolState3);
		var name4 = getName(toolState4);
		download_data['User-defined'] = coordinate1;
		download_data[name2] = coordinate2;
		download_data[name3] = coordinate3;
		download_data[name4] = coordinate4;
		download_data['Liver-tumor'] = coordinate5;
		
		var aTag = document.createElement('a');
		var blob = new Blob([JSON.stringify(download_data, null, 2)], {type : 'application/json'});
		aTag.download = 'annotation';
		aTag.href = URL.createObjectURL(blob);
		aTag.click();
		URL.revokeObjectURL(blob);
						
	},  	//Test
	
	coortest : ({ viewports }) => {
		
		console.log('hi');		
		const element = getEnabledElement(viewports.activeViewportIndex);
		const enabledElement = cornerstone.getEnabledElement(element);	
		const firstId        = enabledElement.image.imageId;
		
	    var patient_id = (enabledElement.image.imageId).split("/");
		var series_id    = patient_id[5];
		var instance_id  = patient_id[7];
		console.log(viewports);
		
		var taUrl= "http://127.0.0.1:5000/getInstance?number=" + series_id;
		var xhr1 = new XMLHttpRequest()
		xhr1.open('GET',taUrl, true)
		xhr1.send()
		//var inresult;
		xhr1.onload = function(){
			var instance_list = JSON.parse(this.responseText);
			console.log(instance_list.result);
			var inresult = instance_list.result;
		
			//return inresult;
		
		//var inresult = getId();
		//console.log(inresult);

		function draw(element, imageId, points){

		const test2 = {}
		test2['handles'] = {}
		test2['color'] = 'red'
		test2['invalidated'] = true;	
		test2.handles['textBox'] = {}
		test2.handles.textBox['freehand'] = {x:257,y:100}
		test2.handles['points'] = points;
		
		cornerstone.loadImage(imageId).then(image => {
		cornerstone.displayImage(element, image);
		const element3 = document.getElementsByClassName('viewport-element')[0];
		cornerstone.enable(element3);
		const enabledElement3 = cornerstone.getEnabledElement(element3);
		enabledElement3.toolStateManager.add(enabledElement3.element, 'FreehandRoi_AI', test2);
		})						
		}
		
		for (let i = 0; i < inresult.length ; i++){
			
		var id = instance_id.split(".");
		//var lastId = 0;
		//var lastId = String(parseInt(id[id.length-1]) -i);
		var newId  = '';
		/*id.pop();
		id.forEach(p => newId = newId + p +'.');*/		
		newId = inresult[i];
		console.log(newId);
		var dataUrl = "http://127.0.0.1:5000/DB_AI_get?number=" + newId;
		var xhr = new XMLHttpRequest()
		xhr.open('GET',dataUrl, true)
		xhr.send()
		var data ;
		xhr.onload = function(){
			data = JSON.parse(this.responseText);
			for(let k = 0; k < data.liver.length; k++){
				var len = data.liver[k].length;
				var points = [];
				var instanceId = data.instance_id;
				console.log(data);
				for(var j = 0; j <len; j++){
					if(j % 10 == 0){
						var ob = {x:data.liver[k][j][0],y:data.liver[k][j][1]}
						points.push(ob);
						}	
				}
				console.log(points);
				//test.handles['points'] = points;
				console.log('1111111');
				var imageId = patient_id[0] +'/'+ patient_id[1] +'/'+ patient_id[2] +'/'+ patient_id[3] +'/'+ patient_id[4] +'/'+ patient_id[5] +'/'+ patient_id[6] +'/'+ instanceId +'/'+ patient_id[8] +'/'+ patient_id[9];
				console.log(imageId);
				draw(element, imageId, points);
			}
		}			
		}
		}
	},  	//coortest
	
	start_drawing2 : ({ viewports }) => {
		
		console.log('hi123');
		const element = getEnabledElement(viewports.activeViewportIndex);
		const enabledElement = cornerstone.getEnabledElement(element);		
	    var patient_id = (enabledElement.image.imageId).split("/");
		var series_id  = patient_id[5];
		var dataUrl= "http://127.0.0.1:5000/start_drawing2?number=" + series_id;
		var xhr = new XMLHttpRequest()
		xhr.open('GET',dataUrl, true)
		xhr.send()		
		xhr.onload = function(){
			var data = JSON.parse(this.responseText);
			//console.log(data);			
			for(var Id in data) {
				var points = [];
				var coor = data[Id];
				for(var i = 0; i < coor.length; i++){
					//console.log(coor);
					if(i % 10 == 0){
						var ob = {x:coor[i][0],y:coor[i][1]}
						points.push(ob);
						}	
				
			var nId = Id.replace('.dcm', '')
			//console.log(nId);
			var imageId = patient_id[0] +'/'+ patient_id[1] +'/'+ patient_id[2] +'/'+ patient_id[3] +'/'+ patient_id[4] +'/'+ patient_id[5] +'/'+ patient_id[6] +'/'+ nId +'/'+ patient_id[8] +'/'+ patient_id[9];
			//console.log(points);
			}
			draw(element, imageId, points)
			}
			window.alert("start_drawing2 done !!");
		}
		
		
		function draw(element, imageId, points){

		const test2 = {}
		test2['handles'] = {}
		test2['color'] = 'red'
		test2['invalidated'] = true;	
		test2.handles['textBox'] = {}
		test2.handles.textBox['freehand'] = {x:257,y:100}
		test2.handles['points'] = points;
		
		cornerstone.loadImage(imageId).then(image => {
		cornerstone.displayImage(element, image);
		const element3 = document.getElementsByClassName('viewport-element')[0];
		//cornerstone.enable(element3);
		const enabledElement3 = cornerstone.getEnabledElement(element3);
		enabledElement3.toolStateManager.add(enabledElement3.element, 'FreehandRoi_TMB', test2);
		})						
		}
		
	},  	//start_drawing2
	
    showDownloadViewportModal: ({ title, viewports }) => {
      const activeViewportIndex = viewports.activeViewportIndex;
      const { UIModalService } = servicesManager.services;
      if (UIModalService) {
        UIModalService.show({
          content: CornerstoneViewportDownloadForm,
          title,
          contentProps: {
            activeViewportIndex,
            onClose: UIModalService.hide,
          },
        });
      }
    },
    updateTableWithNewMeasurementData({
      toolType,
      measurementNumber,
      location,
      description,
    }) {
      // Update all measurements by measurement number
      const measurementApi = OHIF.measurements.MeasurementApi.Instance;
      const measurements = measurementApi.tools[toolType].filter(
        m => m.measurementNumber === measurementNumber
      );

      measurements.forEach(measurement => {
        measurement.location = location;
        measurement.description = description;

        measurementApi.updateMeasurement(measurement.toolType, measurement);
      });

      measurementApi.syncMeasurementsAndToolData();

      refreshCornerstoneViewports();
    },
    getNearbyToolData({ element, canvasCoordinates, availableToolTypes }) {
      const nearbyTool = {};
      let pointNearTool = false;
   
      availableToolTypes.forEach(toolType => {
        const elementToolData = cornerstoneTools.getToolState(
          element,
          toolType
        );

        if (!elementToolData) {
          return;
        }

        elementToolData.data.forEach((toolData, index) => {
          let elementToolInstance = cornerstoneTools.getToolForElement(
            element,
            toolType
          );

          if (!elementToolInstance) {
            elementToolInstance = cornerstoneTools.getToolForElement(
              element,
              `${toolType}Tool`
            );
          }

          if (!elementToolInstance) {
            console.warn('Tool not found.');
            return undefined;
          }

          if (
            elementToolInstance.pointNearTool(
              element,
              toolData,
              canvasCoordinates
            )
          ) {
            pointNearTool = true;
            nearbyTool.tool = toolData;
            nearbyTool.index = index;
            nearbyTool.toolType = toolType;
          }
        });

        if (pointNearTool) {
          return false;
        }
      });

      return pointNearTool ? nearbyTool : undefined;
    },
    removeToolState: ({ element, toolType, tool }) => {
      cornerstoneTools.removeToolState(element, toolType, tool);
      cornerstone.updateImage(element);
    },
    setCornerstoneLayout: () => {
      setCornerstoneLayout();
    },
    setWindowLevel: ({ viewports, window, level }) => {
      const enabledElement = getEnabledElement(viewports.activeViewportIndex);

      if (enabledElement) {
        let viewport = cornerstone.getViewport(enabledElement);

        viewport.voi = {
          windowWidth: Number(window),
          windowCenter: Number(level),
        };
        cornerstone.setViewport(enabledElement, viewport);
      }
    },
    jumpToImage: ({
      StudyInstanceUID,
      SOPInstanceUID,
      frameIndex,
      activeViewportIndex,
    }) => {

      const study = studyMetadataManager.get(StudyInstanceUID);
		
      const displaySet = study.findDisplaySet(ds => {
        return (
          ds.images &&
          ds.images.find(i => i.getSOPInstanceUID() === SOPInstanceUID)
        );
      });

      displaySet.SOPInstanceUID = SOPInstanceUID;
      displaySet.frameIndex = frameIndex;

      window.store.dispatch(
        setViewportSpecificData(activeViewportIndex, displaySet)
      );
      
      refreshCornerstoneViewports();
    },
  };

  const definitions = {
    jumpToImage: {
      commandFn: actions.jumpToImage,
      storeContexts: [],
      options: {},
    },
    getNearbyToolData: {
      commandFn: actions.getNearbyToolData,
      storeContexts: [],
      options: {},
    },
    removeToolState: {
      commandFn: actions.removeToolState,
      storeContexts: [],
      options: {},
    },
    updateTableWithNewMeasurementData: {
      commandFn: actions.updateTableWithNewMeasurementData,
      storeContexts: [],
      options: {},
    },
    showDownloadViewportModal: {
      commandFn: actions.showDownloadViewportModal,
      storeContexts: ['viewports'],
      options: {},
    },
    getActiveViewportEnabledElement: {
      commandFn: actions.getActiveViewportEnabledElement,
      storeContexts: ['viewports'],
      options: {},
    },
    rotateViewportCW: {
      commandFn: actions.rotateViewport,
      storeContexts: ['viewports'],
      options: { rotation: 90 },
    },
    rotateViewportCCW: {
      commandFn: actions.rotateViewport,
      storeContexts: ['viewports'],
      options: { rotation: -90 },
    },
    invertViewport: {
      commandFn: actions.invertViewport,
      storeContexts: ['viewports'],
      options: {},
    },
    flipViewportVertical: {
      commandFn: actions.flipViewportVertical,
      storeContexts: ['viewports'],
      options: {},
    },
    flipViewportHorizontal: {
      commandFn: actions.flipViewportHorizontal,
      storeContexts: ['viewports'],
      options: {},
    },
    scaleUpViewport: {
      commandFn: actions.scaleViewport,
      storeContexts: ['viewports'],
      options: { direction: 1 },
    },
    scaleDownViewport: {
      commandFn: actions.scaleViewport,
      storeContexts: ['viewports'],
      options: { direction: -1 },
    },
    fitViewportToWindow: {
      commandFn: actions.scaleViewport,
      storeContexts: ['viewports'],
      options: { direction: 0 },
    },
    resetViewport: {
      commandFn: actions.resetViewport,
      storeContexts: ['viewports'],
      options: {},
    },
    clearAnnotations: {
      commandFn: actions.clearAnnotations,
      storeContexts: ['viewports'],
      options: {},
    },
    nextImage: {
      commandFn: actions.nextImage,
      storeContexts: ['viewports'],
      options: {},
    },
    previousImage: {
      commandFn: actions.previousImage,
      storeContexts: ['viewports'],
      options: {},
    },
    // TOOLS
    setToolActive: {
      commandFn: actions.setToolActive,
      storeContexts: [],
      options: {},
    },
    setZoomTool: {
      commandFn: actions.setToolActive,
      storeContexts: [],
      options: { toolName: 'Zoom' },
    },
    setCornerstoneLayout: {
      commandFn: actions.setCornerstoneLayout,
      storeContexts: [],
      options: {},
      context: 'VIEWER',
    },
    setWindowLevel: {
      commandFn: actions.setWindowLevel,
      storeContexts: ['viewports'],
      options: {},
    },
    draw_test: {  //draw_test
      commandFn: actions.draw_test,
      storeContexts: ['viewports'],
      options: {},
    },
    draw_CV: {  //draw_CV
      commandFn: actions.draw_CV,
      storeContexts: ['viewports'],
      options: {},
    },
    start_drawing: {  //start_drawing
      commandFn: actions.start_drawing,
      storeContexts: ['viewports'],
      options: {},
    },	
    total3D_drawing: {  //total3D_drawing
      commandFn: actions.total3D_drawing,
      storeContexts: ['viewports'],
      options: {},
    },
    Download_CV: {  //Download_CV
      commandFn: actions.Download_CV,
      storeContexts: ['viewports'],
      options: {},
    },	
    Download_series: {  //Download_series
      commandFn: actions.Download_series,
      storeContexts: ['viewports'],
      options: {},
    },
    Pre_execute_AI: {  //Pre_execute_AI
      commandFn: actions.Pre_execute_AI,
      storeContexts: ['viewports'],
      options: {},
    },
    Test: {  //Test
      commandFn: actions.Test,
      storeContexts: ['viewports'],
      options: {},
    },
    coortest: {  //coortest
      commandFn: actions.coortest,
      storeContexts: ['viewports'],
      options: {},
    },
    start_drawing2: {  //start_drawing2
      commandFn: actions.start_drawing2,
      storeContexts: ['viewports'],
      options: {},
    },
  };

  return {
    actions,
    definitions,
    defaultContext: 'ACTIVE_VIEWPORT::CORNERSTONE',
  };
};

export default commandsModule;
