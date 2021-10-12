// TODO: A way to add Icons that don't already exist?
// - Register them and add
// - Include SVG Source/Inline?
// - By URL, or own component?

// What KINDS of toolbar buttons do we have...
// - One's that dispatch commands
// - One's that set tool's active
// - More custom, like CINE
//    - Built in for one's like this, or custom components?

// Visible?
// Disabled?
// Based on contexts or misc. criteria?
//  -- ACTIVE_ROUTE::VIEWER
//  -- ACTIVE_VIEWPORT::CORNERSTONE
// setToolActive commands should receive the button event that triggered
// so we can do the "bind to this button" magic

const TOOLBAR_BUTTON_TYPES = {
  COMMAND: 'command',
  SET_TOOL_ACTIVE: 'setToolActive',
  BUILT_IN: 'builtIn',
};

const TOOLBAR_BUTTON_BEHAVIORS = {
  CINE: 'CINE',
  DOWNLOAD_SCREEN_SHOT: 'DOWNLOAD_SCREEN_SHOT',
};

/* TODO: Export enums through a extension manager. */
const enums = {
  TOOLBAR_BUTTON_TYPES,
  TOOLBAR_BUTTON_BEHAVIORS,
};

const definitions = [
  {
    id: 'StackScroll',
    label: 'Stack Scroll',
    icon: 'bars',
    //
    type: TOOLBAR_BUTTON_TYPES.SET_TOOL_ACTIVE,
    commandName: 'setToolActive',
    commandOptions: { toolName: 'StackScroll' },
  },
  {
    id: 'Zoom',
    label: 'Zoom',
    icon: 'search-plus',
    //
    type: TOOLBAR_BUTTON_TYPES.SET_TOOL_ACTIVE,
    commandName: 'setToolActive',
    commandOptions: { toolName: 'Zoom' },
  },
  {
    id: 'Wwwc',
    label: 'Levels',
    icon: 'level',
    //
    type: TOOLBAR_BUTTON_TYPES.SET_TOOL_ACTIVE,
    commandName: 'setToolActive',
    commandOptions: { toolName: 'Wwwc' },
  },
  {
    id: 'Pan',
    label: 'Pan',
    icon: 'arrows',
    //
    type: TOOLBAR_BUTTON_TYPES.SET_TOOL_ACTIVE,
    commandName: 'setToolActive',
    commandOptions: { toolName: 'Pan' },
  },
  {
    id: 'Length',
    label: 'Length',
    icon: 'measure-temp',
    //
    type: TOOLBAR_BUTTON_TYPES.SET_TOOL_ACTIVE,
    commandName: 'setToolActive',
    commandOptions: { toolName: 'Length' },
  },
  {
    id: 'ArrowAnnotate',
    label: 'Annotate',
    icon: 'measure-non-target',
    //
    type: TOOLBAR_BUTTON_TYPES.SET_TOOL_ACTIVE,
    commandName: 'setToolActive',
    commandOptions: { toolName: 'ArrowAnnotate' },
  },
  {
    id: 'Angle',
    label: 'Angle',
    icon: 'angle-left',
    //
    type: TOOLBAR_BUTTON_TYPES.SET_TOOL_ACTIVE,
    commandName: 'setToolActive',
    commandOptions: { toolName: 'Angle' },
  },
  {
    id: 'Reset',
    label: 'Reset',
    icon: 'reset',
    //
    type: TOOLBAR_BUTTON_TYPES.COMMAND,
    commandName: 'resetViewport',
  },
  {
    id: 'Cine',
    label: 'CINE',
    icon: 'youtube',
    //
    type: TOOLBAR_BUTTON_TYPES.BUILT_IN,
    options: {
      behavior: TOOLBAR_BUTTON_BEHAVIORS.CINE,
    },
  },
  /*{
    id: 'coortest',
    label: 'coortest',
    icon: 'reset',
    //
    type: TOOLBAR_BUTTON_TYPES.COMMAND,
    commandName: 'coortest',
  },*/
  {
    id: 'More',
    label: 'More',
    icon: 'ellipse-circle',
    buttons: [
      {
        id: 'Magnify',
        label: 'Magnify',
        icon: 'circle',
        //
        type: TOOLBAR_BUTTON_TYPES.SET_TOOL_ACTIVE,
        commandName: 'setToolActive',
        commandOptions: { toolName: 'Magnify' },
      },
      {
        id: 'WwwcRegion',
        label: 'ROI Window',
        icon: 'stop',
        //
        type: TOOLBAR_BUTTON_TYPES.SET_TOOL_ACTIVE,
        commandName: 'setToolActive',
        commandOptions: { toolName: 'WwwcRegion' },
      },
      {
        id: 'DragProbe',
        label: 'Probe',
        icon: 'dot-circle',
        //
        type: TOOLBAR_BUTTON_TYPES.SET_TOOL_ACTIVE,
        commandName: 'setToolActive',
        commandOptions: { toolName: 'DragProbe' },
      },
      {
        id: 'EllipticalRoi',
        label: 'Ellipse',
        icon: 'circle-o',
        //
        type: TOOLBAR_BUTTON_TYPES.SET_TOOL_ACTIVE,
        commandName: 'setToolActive',
        commandOptions: { toolName: 'EllipticalRoi' },
      },
      {
        id: 'RectangleRoi',
        label: 'Rectangle',
        icon: 'square-o',
        //
        type: TOOLBAR_BUTTON_TYPES.SET_TOOL_ACTIVE,
        commandName: 'setToolActive',
        commandOptions: { toolName: 'RectangleRoi' },
      },
      {
        id: 'Invert',
        label: 'Invert',
        icon: 'adjust',
        //
        type: TOOLBAR_BUTTON_TYPES.COMMAND,
        commandName: 'invertViewport',
      },
      {
        id: 'RotateRight',
        label: 'Rotate Right',
        icon: 'rotate-right',
        //
        type: TOOLBAR_BUTTON_TYPES.COMMAND,
        commandName: 'rotateViewportCW',
      },
      {
        id: 'FlipH',
        label: 'Flip H',
        icon: 'ellipse-h',
        //
        type: TOOLBAR_BUTTON_TYPES.COMMAND,
        commandName: 'flipViewportHorizontal',
      },
      {
        id: 'FlipV',
        label: 'Flip V',
        icon: 'ellipse-v',
        //
        type: TOOLBAR_BUTTON_TYPES.COMMAND,
        commandName: 'flipViewportVertical',
      },
      {
        id: 'Clear',
        label: 'Clear',
        icon: 'trash',
        //
        type: TOOLBAR_BUTTON_TYPES.COMMAND,
        commandName: 'clearAnnotations',
      },
      {
        id: 'Bidirectional',
        label: 'Bidirectional',
        icon: 'measure-target',
        //
        type: TOOLBAR_BUTTON_TYPES.SET_TOOL_ACTIVE,
        commandName: 'setToolActive',
        commandOptions: { toolName: 'Bidirectional' },
      },
      {
        id: 'Download',
        label: 'Download',
        icon: 'create-screen-capture',
        //
        type: TOOLBAR_BUTTON_TYPES.BUILT_IN,
        options: {
          behavior: TOOLBAR_BUTTON_BEHAVIORS.DOWNLOAD_SCREEN_SHOT,
          togglable: true,
        },
      },	  
	  /*{ //draw_test
        id: 'tumor segmentation(AI)',
        label: 'tumor segmentation(AI)',
        icon: 'edit',
        //
        type: TOOLBAR_BUTTON_TYPES.COMMAND,
        commandName: 'draw_test',
      },
	  { //draw_CV
        id: 'tumor segmentation(CV)',
        label: 'tumor segmentation(CV)',
        icon: 'edit',
        //
        type: TOOLBAR_BUTTON_TYPES.COMMAND,
        commandName: 'draw_CV',
      },*/
    ],
  },
  {
	id: 'FreehandRoi',
	label: 'User-defined contour',
	icon: 'measure-temp',
	//
	type: TOOLBAR_BUTTON_TYPES.SET_TOOL_ACTIVE,
	commandName: 'setToolActive',
	commandOptions: { toolName: 'FreehandRoi' },
  },
  { //draw_CV
	id: 'tumor segmentation(CV)',
	label: 'Fast-Annotation(CV)',
	icon: 'edit',
	buttons: [
	  { //draw_CV_Y
		id: 'CV(Yellow)',
		label: 'Yellow',
		icon: 'brush',
		//
		type: TOOLBAR_BUTTON_TYPES.SET_TOOL_ACTIVE,
		commandName: 'setToolActive',
		commandOptions: { toolName: 'FreehandRoi_CV' },
	  },
	  { //draw_CV_B
		id: 'CV(Blue)',
		label: 'Blue',
		icon: 'brush',
		//
		type: TOOLBAR_BUTTON_TYPES.SET_TOOL_ACTIVE,
		commandName: 'setToolActive',
		commandOptions: { toolName: 'FreehandRoi_CV_B' },
	  },
	  { //draw_CV_Pu
		id: 'CV(purple)',
		label: 'Purple',
		icon: 'brush',
		//
		type: TOOLBAR_BUTTON_TYPES.SET_TOOL_ACTIVE,
		commandName: 'setToolActive',
		commandOptions: { toolName: 'FreehandRoi_CV_Pu' },
	  },
	  {
        id: 'Eraser',
        label: 'Eraser',
        icon: 'eraser',
        //
        type: TOOLBAR_BUTTON_TYPES.SET_TOOL_ACTIVE,
        commandName: 'setToolActive',
        commandOptions: { toolName: 'Eraser' },
      },
	  {
		id: 'Test',
		label: 'Download annotation coordinates',
		icon: 'create-screen-capture',
		//
		type: TOOLBAR_BUTTON_TYPES.COMMAND,
		commandName: 'Test',
	  },
      /*{
        id: 'Download_CV',
        label: 'Download_CV',
        icon: 'create-screen-capture',
        //
        type: TOOLBAR_BUTTON_TYPES.COMMAND,
        commandName: 'Download_CV',
      },*/
      {
        id: 'Download_series',
        label: 'Download_series',
        icon: 'angle-double-down',
        //
        type: TOOLBAR_BUTTON_TYPES.COMMAND,
        commandName: 'Download_series',
      },
	],
  },
  {
    id: 'tumor segmentation',
    label: 'tumor segmentation',
    icon: 'edit',
    buttons: [
	      /*{
        id: 'Eraser',
        label: 'Eraser',
        icon: 'eraser',
        //
        type: TOOLBAR_BUTTON_TYPES.SET_TOOL_ACTIVE,
        commandName: 'setToolActive',
        commandOptions: { toolName: 'Eraser' },
      },*/
        //
	  	/*{ //draw_CV
        id: 'tumor segmentation(CV)',
        label: 'tumor segmentation(CV)',
        icon: 'edit',
        //
        type: TOOLBAR_BUTTON_TYPES.SET_TOOL_ACTIVE,
        commandName: 'setToolActive',
        commandOptions: { toolName: 'FreehandRoi_CV' },
      },*/
	  	{ //draw_test
        id: 'Pre-execute tumor segmentation',
        label: 'Pre-execute tumor segmentation',
        icon: 'user',
        //
		type: TOOLBAR_BUTTON_TYPES.COMMAND,
		commandName: 'Pre_execute_AI',
	  },
		{ //draw_test
        id: 'Pre-execute result',
        label: 'Pre-execute result',
        icon: 'edit',
        //
		type: TOOLBAR_BUTTON_TYPES.COMMAND,
		commandName: 'coortest',
      },
	  { // Adjustment tool
        id: 'tumor Adjustment tool',
        label: 'tumor Adjustment tool',
        icon: 'edit',
        //
        type: TOOLBAR_BUTTON_TYPES.SET_TOOL_ACTIVE,
        commandName: 'setToolActive',
        commandOptions: { toolName: 'FreehandRoi_AI' },
      },
		/*{ //draw_test
        id: 'brush',
        label: 'brush',
        icon: 'brush',
        //
        type: TOOLBAR_BUTTON_TYPES.SET_TOOL_ACTIVE,
        commandName: 'setToolActive',
        commandOptions: { toolName: 'Brush4' },
      },*/
		/*{ //draw_test
        id: 'tumor segmentation(AI_B)',
        label: 'tumor segmentation(AI_B)',
        icon: 'edit',
        //
        type: TOOLBAR_BUTTON_TYPES.SET_TOOL_ACTIVE,
        commandName: 'setToolActive',
        commandOptions: { toolName: 'Brush2' },
      },*/
      {
        id: 'BrushEraser',
        label: 'Eraser',
        icon: 'eraser',
        //
        type: TOOLBAR_BUTTON_TYPES.SET_TOOL_ACTIVE,
        commandName: 'setToolActive',
        commandOptions: { toolName: 'Eraser' },
      },	  
		/*{ //draw_test
        id: 'tumor segmentation(AI_R)',
        label: 'tumor segmentation(AI_R)',
        icon: 'edit',
        //
        type: TOOLBAR_BUTTON_TYPES.SET_TOOL_ACTIVE,
        commandName: 'setToolActive',
        commandOptions: { toolName: 'FreehandRoi_AI' },
      },*/
	],
  },
  {
    id: 'TMB_Semi_automated',
    label: 'TMB_Semi_automated',
    icon: 'cube',
    buttons: [  
	   {
        id: 'FreehandRoi2',
        label: 'top slice',
        icon: 'measure-temp',
        //
        type: TOOLBAR_BUTTON_TYPES.SET_TOOL_ACTIVE,
        commandName: 'setToolActive',
        commandOptions: { toolName: 'FreehandRoi2' },
      },
      {
        id: 'FreehandRoi3',
        label: 'middle slice',
        icon: 'measure-temp',
        //
        type: TOOLBAR_BUTTON_TYPES.SET_TOOL_ACTIVE,
        commandName: 'setToolActive',
        commandOptions: { toolName: 'FreehandRoi3' },
      },
      {
        id: 'FreehandRoi4',
        label: 'bottom slice',
        icon: 'measure-temp',
        //
        type: TOOLBAR_BUTTON_TYPES.SET_TOOL_ACTIVE,
        commandName: 'setToolActive',
        commandOptions: { toolName: 'FreehandRoi4' },
      },
	  /*{
		id: 'start-drawing',
		label: 'start-drawing',
		icon: 'youtube',
		//
		type: TOOLBAR_BUTTON_TYPES.COMMAND,
		commandName: 'start_drawing',
	  },*/
	  {
		id: 'start-drawing2',
		label: 'start-drawing',
		icon: 'youtube',
		//
		type: TOOLBAR_BUTTON_TYPES.COMMAND,
		commandName: 'start_drawing2',
	  },
	  { // Adjustment tool
        id: 'tumor Adjustment tool',
        label: 'TMB Adjustment tool',
        icon: 'edit',
        //
        type: TOOLBAR_BUTTON_TYPES.SET_TOOL_ACTIVE,
        commandName: 'setToolActive',
        commandOptions: { toolName: 'FreehandRoi_TMB' },
      },
      {
        id: 'BrushEraser',
        label: 'Eraser',
        icon: 'eraser',
        //
        type: TOOLBAR_BUTTON_TYPES.SET_TOOL_ACTIVE,
        commandName: 'setToolActive',
        commandOptions: { toolName: 'Eraser' },
      },
	  /*{
		id: 'Contours draw back',
		label: 'Contours draw back',
		icon: 'brush',
        //
        type: TOOLBAR_BUTTON_TYPES.SET_TOOL_ACTIVE,
        commandName: 'setToolActive',
        commandOptions: { toolName: 'FreehandRoi_TMB' },
      },*/
	  /*{
		id: 'Exit2DMPR',
		label: 'Exit 3D segmentation',
		icon: 'times',
		//
		type: TOOLBAR_BUTTON_TYPES.COMMAND,
		commandName: 'setCornerstoneLayout',
	  }, */ 
	],
  },
  {
    id: 'Exit2DMPR',
    label: 'Exit 2D MPR',
    icon: 'times',
    //
    type: TOOLBAR_BUTTON_TYPES.COMMAND,
    commandName: 'setCornerstoneLayout',
    context: 'ACTIVE_VIEWPORT::VTK',
  },
  /*{
    id: '3D',
    label: '3D Perspective view',
    icon: 'sphere',
    //
    type: TOOLBAR_BUTTON_TYPES.COMMAND,
    commandName: 'total3D_drawing',
  },*/
];

export default {
  definitions,
  defaultContext: 'ACTIVE_VIEWPORT::CORNERSTONE',
};
