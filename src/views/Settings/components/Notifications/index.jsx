import React, { Component } from 'react';

// Externals
import PropTypes from 'prop-types';
import classNames from 'classnames';
import $ from 'jquery';
import global from '../../../../global';
import Swal from 'sweetalert2'

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import { Checkbox, Typography, Button,Input,MenuItem, Select } from '@material-ui/core';

// Shared components
import {
  Portlet,
  PortletHeader,
  PortletLabel,
  PortletContent,
  PortletFooter
} from 'components';

// Component styles
import styles from './styles';

class Notifications extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.isAuthentication = false;
    this.state.userData = global.user;
    this.state.qrImageLink="";
    this.state.secretKey="";
    this.state.manuelEntryKey="";
    this.state.priceValue='';
    this.state.testCode='';
    this.state.evDurumu=0;
    this.state.TelefonDurumu=0;
    this.state.krediSayisi='';
    this.state.krediMiktari=0;
    this.state.yas=0;
  }
  handleChange = e => {
    this.setState({
      testCode: e.target.value
    });
  };
  handleChangeKrediMiktari(event)
  {
    this.setState({krediMiktari:event.target.value});
  }
  handleChangeKrediSayisi(event)
  {
    this.setState({krediSayisi:event.target.value});
  }
  handleChangeYas(event)
  {
    this.setState({yas:event.target.value});
  }
  handleMultiselectChangeEv = name => event => {
      if(event.target.value==0)
        {
          this.setState({ evDurumu:0});
        }
      else
      this.setState({ evDurumu:1});
  };
  handleMultiselectChangeTel = name => event => {
    if(event.target.value==0)
      {
        this.setState({ TelefonDurumu:0});
      }
    else
    this.setState({ TelefonDurumu:1});
};
Gonder()
{
  let self =this;
  let data = {
    krediMiktari: this.state.krediMiktari,
    yas: this.state.yas,
    evDurumu:self.state.evDurumu,
    aldigi_kredi_sayi:self.state.krediSayisi,
    telefonDurumu:self.state.TelefonDurumu
  };
  var settings = {
    "async": true,
    "url": "http://127.0.0.1:5000/m4a_Api",
    "method": "POST",
    "headers": {
      "Content-Type": "application/json",
      "Accept": "*/*",
      "Cache-Control": "no-cache",
      "Host": "127.0.0.1:5000",
      "Accept-Encoding": "gzip, deflate",
      "Content-Length": "85",
      "Connection": "keep-alive",
    },
    "processData": false,
    "data": JSON.stringify(data)
  }

  $.ajax(settings).done(function (response) {
    console.log(response);
    alert(response)
  });
}
  
  render() {
    const { classes, className, ...rest } = this.props;

    const rootClassName = classNames(classes.root, className);

    return (
      <Portlet
        {...rest}
        className={rootClassName}
      >
        <PortletHeader>
          <PortletLabel
            subtitle="Kredi Başvuruları"
            title="Kredi Sorgula"
          />
        </PortletHeader>
        <PortletContent noPadding>
        <table cellSpacing="10" cellPadding="10">
                <tr>
                  <td>Kredi Miktarı : </td>
                  <td><Input type="text" name="balance" onChange={this.handleChangeKrediMiktari.bind(this)}/></td>
                  </tr>
                <tr>
                  <td>Yaş: </td>
                  <td><Input type="text" name="balance" onChange={this.handleChangeYas.bind(this)}/></td>
                 </tr>
                 <tr>
                  <td>Ev Durumu: </td>
                  <td><Select
                        value={this.state.evDurumu}
                        style={{ width: "250px", fontSize: "15px", paddingLeft: "5px", fontWeight: "bold" }}
                        onChange={this.handleMultiselectChangeEv('sendHesapTuruGiden')}
                        input={<Input id="select-multiple-global" />}
                    >
                <MenuItem value="1" id="1" selected={true}>VAR</MenuItem>
                <MenuItem value="0" id="0" selected={true}>YOK</MenuItem>
                    </Select></td>
                 </tr>
                  
                  <tr>
                  <td>Aldığı Kredi Sayısı : </td>
                  <td><Input type="text" name="balance" onChange={this.handleChangeKrediSayisi.bind(this)}/></td>
                  </tr>
                  <tr>
                  <td>Telefon Durumu : </td>
                  <td><Select
                        value={this.state.TelefonDurumu}
                        style={{ width: "250px", fontSize: "15px", paddingLeft: "5px", fontWeight: "bold" }}
                        onChange={this.handleMultiselectChangeTel('sendHesapTuruGiden')}
                        input={<Input id="select-multiple-global" />}
                    >
                <MenuItem value="1" id="1" selected={true}>VAR</MenuItem>
                <MenuItem value="0" id="0" selected={true}>YOK</MenuItem>
                    </Select></td>
                  </tr>
                  
                  <tr>
                  <td><Button onClick={this.Gonder.bind(this)}>Kredi Başvur</Button></td>
                  </tr>
                </table>
          
        </PortletContent>
        <PortletFooter className={classes.portletFooter}>
          
        </PortletFooter>
      </Portlet>
    );
  }
}

Notifications.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Notifications);
