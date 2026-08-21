import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Funcionario } from '../../core/models/funcionario.model';

@Component({
  selector: 'app-funcionario-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './funcionario-form.component.html',
})
export class FuncionarioFormComponent {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<FuncionarioFormComponent>);
  data = inject<Funcionario | null>(MAT_DIALOG_DATA);

  status = ['Ativo', 'Inativo', 'Ferias'];

  form = this.fb.nonNullable.group({
    nome: [this.data?.nome ?? '', Validators.required],
    cargo: [this.data?.cargo ?? '', Validators.required],
    status: [this.data?.status ?? 'Ativo', Validators.required],
  });

  get titulo(): string {
    return this.data ? 'Editar funcionario' : 'Novo funcionario';
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
