import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [DropdownModule, FormsModule, FloatLabelModule, InputTextareaModule, ButtonModule, CommonModule],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss'
})

export class ContactUsComponent implements OnInit {

  constructor(private api: UserService, private userService: UserService) { }
  userName: string | undefined;
  userEmail: string | undefined;
  content: string = '';
  subjects: { label: string; value: string }[] = [];
  selectedSubject: string | undefined;
  sendMassage: boolean = false;
  massage: string = ''
  showMassage: boolean = false
  @Output() closeDialog = new EventEmitter<void>();

  toggleSendMessage() {
    this.closeDialog.emit();
  }


  ngOnInit() {
    this.subjects = [
      { label: "Improvement proposal", value: "Improvement proposal" },
      { label: "A glitch or temporary problem", value: "A glitch or temporary problem" },
      { label: "Service or advice", value: "Service or advice" },
      { label: "Other", value: "Other" }
    ];
  }

  sendContant() {
    this.userService.GetUserDetails().subscribe(
      (userDetails: { fullName: string, role: string, email: string }) => {
        if (userDetails) {
          this.userName = userDetails.fullName;
          this.userEmail = userDetails.email;
        }
        const emailParams = {
          reply_to: this.userEmail,
          from_name: this.userName,
          message: this.content,
          subject: this.selectedSubject
        };
        emailjs.send('service_x0yy2bj', 'template_ny3cakx', emailParams, 'dMAR_TMXDE7_51FVk')
          .then(() => {
            this.massage = 'The email was sent successfully';
            this.showMassage = true;
            setTimeout(() => {
              this.toggleSendMessage(); 
            }, 2000);
          }, (error) => {
            console.error('Error sending email', error);
            this.massage = 'Error sending email';
            this.showMassage = true;
            setTimeout(() => {
              this.toggleSendMessage(); 
            }, 2000);
          });
      },
      (error) => {
        console.error('Error fetching user details:', error);
      }
    );
  }
}
