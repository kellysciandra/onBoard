import React, { Component } from 'react';
import pdftest from '../pdf/pdftest.pdf'
import { Document, Page } from "react-pdf/dist/entry.webpack";
import ReactDOM from 'react-dom'
import SignatureCanvas from 'react-signature-canvas'

export default class EmployeeDocs extends Component {
  state = { numPages: null, pageNumber: 1 };

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  };

  goToPrevPage = () =>
    this.setState(state => ({ pageNumber: state.pageNumber - 1 }));
  goToNextPage = () =>
    this.setState(state => ({ pageNumber: state.pageNumber + 1 }));

  render() {
    const { pageNumber, numPages } = this.state;

    return (
      <div className='employee_docs'>
        <nav>
          <button onClick={this.goToPrevPage}>Prev</button>
          <button onClick={this.goToNextPage}>Next</button>
        </nav>

        <div>
          <Document
            file={pdftest}
            onLoadSuccess={this.onDocumentLoadSuccess}
          >
            <Page pageNumber={pageNumber} width={600} />
          </Document>
        </div>
        <div>
            <SignatureCanvas penColor='green' canvasProps={{width: 500, height: 200, className: 'sigCanvas'}}/>
        </div>

        <p>
          Page {pageNumber} of {numPages}
        </p>
      </div>
    );
  }
}
