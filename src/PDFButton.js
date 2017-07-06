import React, {Component} from 'react';
import { Button} from 'semantic-ui-react';
import fetch from 'isomorphic-fetch';

var jsPDF = require('jspdf');

class PDFButton extends Component{
    constructor(props){
        super(props);
        this.state = {
            result: null,
        }
        this.url = this.props.url;
        this.generatePDF = this.generatePDF.bind(this);
        this.setData = this.setData.bind(this);

    }

    setData(result){
        this.setState({ result });
        
        console.log("Generate PDF!");
        var pdf = new jsPDF('p', 'mm', 'a4');
        var date = new Date();
        pdf.setFont("times");
        pdf.setFontSize(10);
        pdf.text(30,30, "Invoice");
        pdf.text(30,35, "as of " + date);
        pdf.text(30,50, "Name");
        pdf.text(90,50, "Description");

        var height = 60;
        for(var i=0; i<result.length; i++){
            pdf.text(30, height, result[i].name);
            pdf.text(90, height, result[i].description);
            height += 5;
        }

        pdf.save("billing.pdf");
    }

    generatePDF(){
        console.log(this.url);
        fetch(this.url)
        .then(response => response.json())
        .then(result => this.setData(result));

    }


    render(){
        return(
            <div>
                <Button
                    onClick={this.generatePDF}
                    inverted color='green'
                >
                    {this.props.title}
                </Button>    
            </div>
        );
    }
}

export default PDFButton;