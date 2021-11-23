import { Component, OnInit } from '@angular/core';
import { DriverService } from '../../services/driver.service'
import { Router, ActivatedRoute } from '@angular/router'
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.scss']
})
export class DriverComponent implements OnInit {

  public drivers = [];
  addDriver: any

  customError = (statusText, statusMessage) => {
    return {
      statusText: statusText,
      message: statusMessage
    }
  }

  constructor(private router: Router, private route: ActivatedRoute, private _driverService: DriverService) { }

  ngOnInit(): void {
    this._driverService.getDrivers()
      .subscribe((data) => {
        this.drivers = data;
        console.log(data)
      },
        error => {
          console.error('error', error)
        }
      )
  }

  driverDelete(driverId) {
    this._driverService.deleteDriver(driverId)
      .subscribe(
        response => {
          console.log('success', response);
          this.ngOnInit();
          this.driverDeleted();
        },
        error => {
          console.error('error', error)
        }
      )
  }

  openDriverModal = async () => {
    await Swal.fire({
      title: 'Add Driver',
      html:
        '<input id="name" type="text" class="swal2-input" placeholder="Driver Name">' +
        '<input id="email" type="email" class="swal2-input" placeholder="Driver Email">' +
        '<input id="address" type="text" class="swal2-input" placeholder="Driver address">',
      focusConfirm: false,
      confirmButtonColor: '#1838c5',
      allowOutsideClick: true,
      allowEscapeKey: true,
      preConfirm: () => {
        this.addDriver = {
          name: (document.getElementById('name') as HTMLInputElement).value,
          email: (document.getElementById('email') as HTMLInputElement).value,
          address: (document.getElementById('address') as HTMLInputElement).value
        }
      }
    }).then((result) => {
      if (result.isConfirmed) {
        if (!this.addDriver.name || !this.addDriver.email || !this.addDriver.address) {
          const error = this.customError("Missing fields!", "Please enter all the fields");
          this.showError(error);
        } else {
          Swal.close();
          this._driverService.addDriver(this.addDriver).subscribe(
            (res) => {
              console.log('success', res)
              this.driverAdded();
              this.ngOnInit();
            },
            error => {
              console.error('error', error)
            }
          )
        }
      }
    })
  }

  showError = (error) => {
    Swal.fire({
      icon: 'error',
      title: error.statusText,
      text: error.message,
      showConfirmButton: true,
      confirmButtonText: "Try Again",
      confirmButtonColor: '#9c27b0',
      allowOutsideClick: false,
      allowEscapeKey: false,
    }).then((result) => {
      if (result.isConfirmed) {
        this.openDriverModal();
      }
    })
  }

  driverAdded = () => {
    Swal.fire({
      icon: 'success',
      title: 'Driver added successfully',
      html: 'Redirecting to the Driver page...',
      timer: 3000,
      timerProgressBar: true,
      showConfirmButton: false,
      willOpen: () => {
        Swal.showLoading();
      }
    }).then((result) => { })
  }

  driverDeleted = () => {
    Swal.fire({
      icon: 'success',
      title: 'Driver deleted successfully',
      html: 'Redirecting to the Driver page...',
      timer: 3000,
      timerProgressBar: true,
      showConfirmButton: false,
      willOpen: () => {
        Swal.showLoading();
      }
    }).then((result) => { })
  }

}
