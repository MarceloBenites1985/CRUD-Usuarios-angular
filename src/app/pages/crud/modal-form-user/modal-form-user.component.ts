import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsersService } from '../../../services/users.service';
import { User } from '../../../interfaces/user';

@Component({
  selector: 'app-modal-form-user',
  templateUrl: './modal-form-user.component.html',
  styleUrl: './modal-form-user.component.scss'
})
export class ModalFormUserComponent {

      planosSaude = [
          {
            id:1,
            descricao: 'Plano 300 enfermaria'
          },
          {
            id:2,
            descricao: 'Plano 400 enfermaria'
          },
          {
            id:3,
            descricao: 'Plano 500 Plus'
          },
      ];  
      
      planosOdonto = [
        {
          id:1,
          descricao: 'Plano Basic'
        },
        {
          id:2,
          descricao: 'Plano Medium'
        },
        {
          id:3,
          descricao: 'Plano Plus'
        },
      ];

      formUser: FormGroup;
      editUse: boolean = false;

name: string|number|null;

      constructor(
        public dialogRef: MatDialogRef<ModalFormUserComponent>,
        private formBuilder: FormBuilder,
        private userService: UsersService,
        @Inject(MAT_DIALOG_DATA) public data: any,
      ){}

      ngOnInit(){
        this.buildForm();
        if(this.data && this.data.name){
          this.editUse = true;
        }
      }
      //Salvar usuário
      saveUser(){
          const objectUserForm: User = this.formUser.getRawValue();

          if(this.data && this.data.name){
             
              //EDITAR USUARIO
              this.userService.update(this.data.firebaseId, objectUserForm).then(
                (response: any) => {
                  window.alert('Usuario Editado com sucesso');
                  this.closeModal();
                }
              )
              .catch(
                err => {
                    window.alert("Houve um erro ao editar o usuario");
                    console.error(err);
              })

            }else{
              //SALVAR USUARIO
              this.userService.addUser(objectUserForm).then(
                (response: any) => {
                  window.alert('Usuario Salvo com sucesso');
                  this.closeModal();
                }
              )
              .catch(
                err => {
                    window.alert("Houve um erro ao salvar o usuario");
                    console.error(err);
              })
          }

          
          
      }

      buildForm(){
        this.formUser = this.formBuilder.group({
          name: [null, [Validators.required, Validators.minLength(3)]],
          email: [null, [Validators.required, Validators.email]],
          sector: [null, [Validators.required, Validators.minLength(2)]],
          role: [null, [Validators.required, Validators.minLength(5)]],
          healthPlan: [''],
          dentalPlan: [''],

        });

        if(this.data && this.data.name){
          this.fillForm();
        }
      }
      //Preencher formulario para edição 
      fillForm(){
        this.formUser.patchValue({
          name: this.data.name,
          email: this.data.email,
          sector: this.data.sector,
          role: this.data.role,
          healthPlan: this.data.healthPlan,
          dentalPlan: this.data.dentalPlan,
        });
      }

      closeModal(){this.dialogRef.close()}
}
