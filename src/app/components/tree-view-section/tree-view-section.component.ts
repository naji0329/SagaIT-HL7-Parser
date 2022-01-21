import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
declare var require: any;
export let sampleData: any[] = [
  // 1
  {
    icon: true,
    value:"MSH|^~\&amp;|ADT-HIS||HL7INSPECTOR||20060101103100||ADT^A02|1|P|2.5.1",
    description: 'Message Header',
    opt: '',
    rp: "",
    valuePresenter: false,
    message: "The MSH segment defines the intent, source, destination, and some specifics of the syntax of a message.Chapter: 2.15.9",
    subtasks: [
      { value:"1: |" , description: 'Field Seperator',opt: 'R',valuePresenter: true },
      { value:"2: |",  description: 'Encoding Character', opt:'R' ,valuePresenter: true},
      { icon: true , value:"3: ADT-HIS",  description: 'Sending Application', opt:'O',valuePresenter: true,
        subtasks: [
          { value:"ADT-HIS" , description: 'Namespace ID', opt:'O' , rp:'',valuePresenter: true}
        ]
      },
       ]
  },
  // 2
  {
    icon: true,
    value: 'EVN|A01|20060101||',
    description: 'Event Type',
    opt:'',
    rp:'',
    valuePresenter: false,
    message: 'The EVN segment is used to communicate necessary trigger event information to receiving applications.Chapter: 3.4.1',
    subtasks: [
      { value: '1: A01',  description: 'Event Type Code', opt:'B' ,valuePresenter: true},
      { value: '2: 20060101', description: 'Recorded Date/Time' , opt:'R' ,valuePresenter: true },
       ]
  },
  // 3
  {
    icon: true,
    value:"PID||||4711|母鹿^约翰~Doe^John||19700220|M|||Sesamstreet 17^76137^上海^CN|||||GS|EV||||	",
    description: 'Patient / Identification',
    opt: '',
    rp:'',
    valuePresenter: false,
    message:"The PID segment is used by all applications as the primary means of communicating patient identification information. This segment contains permanent patient identifying and demographic information that, for the most part, is not likely to change frequently.Chapter: 3.4.2",
    subtasks: [{ icon: true , value: '1: 1', description: 'Set ID - OBX', opt: 'R',valuePresenter: true,
          subtasks: [{
           value: '1',
           description: 'Sequence ID',
           opt: '',
           rp:'',
           valuePresenter: true
        }]
      },
      {
        icon: true,
        label : true ,
        value: '2: ED',
        description: 'Value Type',
        opt: 'R',
        rp:'',
        valuePresenter: true,
        subtasks: [{
          icon: false,
          label : true ,
          value: 'ED ',
          description: 'Coded Value for HL7-Defined Tables',
          opt: '',
          rp:'',
          valuePresenter: true,
        }]
      },

      {
        icon: true,
        value: '3: EGK_DATA52^eGK-Daten^HL7-DEU',
        description: 'Observation Identifier',
        opt: 'O',
        rp:'',
        valuePresenter: true,
        subtasks: [{
          icon: false,
          value: 'EGK_DATA52	',
          description: 'Identifier',
          opt: 'O',
          rp:'',
          valuePresenter: true
        },
        {
          icon: false,
          value: 'eGK-Daten',
          description: 'Text',
          opt: 'O',
          rp:'',
          valuePresenter: true
        },
        {
          icon: false,
          value: 'HL7-DEU',
          description: 'Name of Coding System',
          opt: 'O',
          rp:'',
          valuePresenter: true
        }]
      }
    ]
  },
   // 4
   {
    icon: true,
    value:"OBX|3|ED|502^CHEST XRAY^L||Word^TEXT^^Base64^SnVzdCBhIHNpbXBsZSB0ZXh0",
    description: 'Observation / Result',
    opt: '',
    rp:'',
    valuePresenter: false,
    subtasks: [{ icon: true , value: '1: 3', description: 'Set ID - OBX', opt: 'R', valuePresenter: true,
          subtasks: [{
            id:19 ,
           value: '3',
           description: 'Sequence ID',
           opt: '',
           rp:'',
           valuePresenter: true
        }]
      },
      {
        icon: true,
        label:true,
        value: '2: ED',
        description: 'Value Type',
        opt: 'R',
        rp:'',
        valuePresenter: true,
        subtasks: [{
          icon: false,
          label : true ,
          value: 'ED ',
          description: 'Coded Value for HL7-Defined Tables',
          opt: '',
          rp:'',
          valuePresenter: true
        }]
      },

      {
        icon: true,
        value: '3: 502^CHEST XRAY^L',
        description: 'Observation Identifier',
        opt: 'O',
        rp:'',
        valuePresenter: true,
        subtasks: [{
          icon: false,
          value: '502',
          description: 'Identifier',
          opt: 'O',
          rp:'',
          valuePresenter: true
        },
        {
          icon: false,
          value: 'CHEST XRAY',
          description: 'Text',
          opt: 'O',
          rp:'',
          valuePresenter: true
        },
        {
          icon: false,
          value: 'L',
          description: 'Name of Coding System',
          opt: 'O',
          rp:'',
          valuePresenter: true
        }]
      },
      {
        icon: true,
        value: '5: Word^TEXT^^Base64^SnVzdCBhIHNpbXBsZSB0ZXh0',
        description: 'Observation Value',
        opt: 'C/R',
        rp:'refresh',
        valuePresenter: true,
        subtasks: [{
          icon: false,
          value: 'Word',
          description: '',
          opt: '',
          rp:'',
          valuePresenter: true
        },
        {
          icon: false,
          value: 'TEXT',
          description: '',
          opt: '',
          rp:'',
          valuePresenter: true
        },
        {
          icon: false,
          value: 'L',
          description: 'Name of Coding System',
          opt: 'O',
          rp:'',
          valuePresenter: true
        }]
      }
    ]
  }
];
@Component({
  selector: 'app-tree-view-section',
  templateUrl: './tree-view-section.component.html',
  styleUrls: ['./tree-view-section.component.scss']
})
export class TreeSiewSectionComponent implements OnInit {
  bDisplayAlert: boolean = false;
  sText: string = "";
  sampleData = sampleData;
  items: any = [];
  messageHeaderPane: any = "No segement selected";
  badgeData: any;
  message: any;
  pane1 : any = "No file selected or unknown"
  fileUrl: any = "";
  ValuePresenterDisplayOptions : any = [
    { name: 'Original Value' , value: 'original'},
    { name: 'Formatted Value' , value: 'formatted'},
    { name: 'Formatted Date / Time' , value: 'datetime'},
    { name: 'Decoded Base64 String' , value: 'base64'},
    { name: 'Decoded Base64 PDF Document' , value: 'base64-pdf'},
    { name: 'Decoded Base64 Image' , value: 'base64-image'},
    { name: 'Decoded Base64 XML Document' , value: 'base64-xml'},
    { name: 'Decoded Base64 CDA Document (Experimental)' , value: 'base64-cda'}
  ]
  base_64_pdf: boolean = false;
  base64_xml: boolean = false;
  selectedValue: any;
  app = require( '@3dgenomes/ngx-resizable/package.json');
  title: string = this.app.name;
  version: string = this.app.version;
  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    const data = 'some text';
    const blob = new Blob([data], { type: 'application/octet-stream' });

    this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
    this.items=this.getItems(this.sampleData,null,0)

  }
  expanded(item:any)
  {
    item.expanded=!item.expanded;
    this.items=this.getItems(this.sampleData,null,0);
  }
  getItems(data:any, items:any,index:any) {
    data.forEach((x:any) => {
      if (!items)
        items=[];
      items.push(x);
      items[items.length-1].index=index
      if (x.subtasks && x.expanded)
        this.getItems(x.subtasks,items,index+1);
    }
    )
    return items;
  }
  ReadValues(item:any)
  {
    console.log("item",item);
    if(!item.valuePresenter)
    {
      this.messageHeaderPane = item.description;
      this.message = item.message
    }
    else 
    {
      this.pane1 = item.description
    }
    if(item.valuePresenter)
    {
      this.badgeData = item.value
    }
    else
    {
      this.badgeData = ""
    }
  }
  CopyToClipBoard()
  {
    this.bDisplayAlert = true
    this.sText = "Successful copied to clipboard"
    setTimeout(() => {
      this.bDisplayAlert = false
    }, 3000);
  }
  Compared()
  {
    this.bDisplayAlert = true
    this.sText = "Successful Compared. See the results in compare tab"
    setTimeout(() => {
      this.bDisplayAlert = false
    }, 3000);
  }
  test(options:any) 
  {
    this.selectedValue = options.target.value
    console.log(this.selectedValue);
    
    if(options.target.value === 'base64-pdf')
    {
      console.log("OPtions::",options.target.value);
      this.base_64_pdf = true;
      this.base64_xml = false;
    }
    if(options.target.value === 'base64-xml')
    {
      this.base64_xml = true;
      this.base_64_pdf = false;
    }
    
  }

}
