import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Cliente } from '../../core/models/cliente.model';
import { CepService } from '../../core/services/cep.service';

@Component({
  selector: 'app-cliente-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './cliente-form.component.html',
})
export class ClienteFormComponent {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<ClienteFormComponent>);
  private cepService = inject(CepService);
  data = inject<Cliente | null>(MAT_DIALOG_DATA);

  buscandoCep = false;
  erroCep = '';

  form = this.fb.nonNullable.group({
    nome: [this.data?.nome ?? '', Validators.required],
    cep: [this.data?.cep ?? '', Validators.required],
    endereco: [this.data?.endereco ?? '', Validators.required],
    cidade: [this.data?.cidade ?? '', Validators.required],
    estado: [this.data?.estado ?? '', Validators.required],
    telefone: [this.data?.telefone ?? '', Validators.required],
  });

  get titulo(): string {
    return this.data ? 'Editar cliente' : 'Novo cliente';
  }

  async buscarCep(): Promise<void> {
    const cep = this.form.controls.cep.value;
    this.erroCep = '';
    this.buscandoCep = true;
    const resultado = await this.cepService.buscar(cep);
    this.buscandoCep = false;

    if (!resultado) {
      this.erroCep = 'CEP nao encontrado.';
      return;
    }

    this.form.patchValue({
      endereco: [resultado.logradouro, resultado.bairro].filter(Boolean).join(', '),
      cidade: resultado.localidade,
      estado: resultado.uf,
    });
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
