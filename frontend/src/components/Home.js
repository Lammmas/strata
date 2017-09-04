import React from "react";
import { connect } from "react-redux";

import Accordion from 'react-bootstrap/lib/Accordion';
import NavItem from 'react-bootstrap/lib/NavItem';
import Panel from 'react-bootstrap/lib/Panel';
import Grid from 'react-bootstrap/lib/Grid';
import Nav from 'react-bootstrap/lib/Nav';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';


// Home page component
export class Home extends React.Component {
    constructor(props) {
        super(props);
        this.handleSelect = this.handleSelect.bind(this);
        this.state = {
            location: {coords: {latitude: 0, longitude: 0}},
            results: {results: [], loading: false},
            activeKey: 0,
            cycle: false
        };
    }

    componentWillMount() {
        // As soon as page loads we want to get the loaction
        this.props.dispatch({
            type: 'LOCATE'
        });
    }

    render() {
        const location = this.props.location;
        let latitude = 0;
        let longitude = 0;
        let accordions = [];
        let result = null;
        let data = null;
        let info = [];
        let key = 0;

        if ('coords' in location) {
            latitude = location.coords.latitude;
            longitude = location.coords.longitude;
        }

        if (this.props.results.results != undefined && this.props.results.results.length > 0) {
            for (let idx in this.props.results.results) {
                // for ... of didn't work out, so using for ... in instead
                result = this.props.results.results[idx];
                info = [];

                info.push(<h4 key={'lines' + key}>Lines</h4>);
                for (let i in result.modes) {
                    info.push(<p key={i + key}>{i.toUpperCase()}: {result.modes[i].lines.join(', ')}</p>);
                }

                if (result.disruption.length > 0) {
                    info.push(<h4 key={'disruptions' + key}>Disruptions</h4>);

                    for (let i in result.disruption) info.push(<p key={'d' + i.mode + key}>{i.mode}: {i.description}</p>);
                }

                accordions.push(<Panel key={key} header={result.name} eventKey={key}>{info}</Panel>);
                key++;
            }

            data = <Accordion>{accordions}</Accordion>;
        }

        // Opted to put everything in one for ease, although in reality they should be other components like Nav
        return (
            <Grid>
                <Row>
                    <Col>
                        <h3>You are at {latitude.toFixed(4)} : {longitude.toFixed(4)}</h3>
                    </Col>
                </Row>
                <Row>
                    <Nav justified activeKey={this.state.activeKey} onSelect={this.handleSelect}>
                        <NavItem eventKey="1" title="Tube">Tube</NavItem>
                        <NavItem eventKey="2" title="Overground">Overground</NavItem>
                        <NavItem eventKey="3" title="DLR">DLR</NavItem>
                        <NavItem eventKey="4" title="Cycle Hire">Cycle Hire</NavItem>
                    </Nav>
                </Row>
                {this.state.cycle == false && <Row>{data}</Row>}
                {this.state.cycle == true && <Row>TBD</Row>}
            </Grid>
        );

        return (<Grid><Row><Col><p>Please enable location tracking to use this</p></Col></Row></Grid>);
    }

    handleSelect(eventKey) {
        let type = '';

        this.setState({
            activeKey: eventKey
        });

        if (eventKey != 4 && eventKey != '4') {
            this.setState({cycle: false, results: {results: [], loading: true}});

            // This could be abstracted and brought out, but for now it's good enough here
            switch (eventKey) {
                case 1:
                case '1':
                    type = 'Tube';
                    break;
                case 2:
                case '2':
                    type = 'Overground';
                    break;
                case 3:
                case '3':
                    type = 'DLR';
                    break;
                case 4:
                case '4':
                    type = 'Cycle';
                    break;
                default:
                    type = 'Tube';
            }

            // Search the API with the new type
            this.props.dispatch({
                type: 'SEARCH',
                name: type,
                lat: this.props.location.coords.latitude,
                lon: this.props.location.coords.longitude,
            });
        } else this.setState({cycle: true});
    }
}

function mapStateToProps(state) {
    return {
        location: state.location,
        results: state.results
    };
}

export default connect(mapStateToProps)(Home);