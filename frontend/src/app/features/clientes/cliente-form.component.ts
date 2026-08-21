import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Cliente } from '../../core/models/cliente.model';

@Component({
  selector: 'app-cliente-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './cliente-form.component.html',
})
export class ClienteFormComponent {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<ClienteFormComponent>);
  data = inject<Cliente | null>(MAT_DIALOG_DATA);

  form = this.fb.nonNullable.group({
    nome: [this.data?.nome ?? '', Validators.required],
    cidade: [this.data?.cidade ?? '', Validators.required],
    telefone: [this.data?.telefone ?? '', Validators.required],
  });

  get titulo(): string {
    return this.data ? 'Editar cliente' : 'Novo cliente';
  }

  salvar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.dialogRef.close(this.form.getRawValue());
  }

  cancelar(): void {
    this.dialogRef.close();
  }
}
