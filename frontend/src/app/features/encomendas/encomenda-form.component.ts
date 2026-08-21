import { Component, OnInit, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Encomenda } from '../../core/models/encomenda.model';
import { Cliente } from '../../core/models/cliente.model';
import { ClientesService } from '../../core/services/clientes.service';

@Component({
  selector: 'app-encomenda-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './encomenda-form.component.html',
})
export class EncomendaFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<EncomendaFormComponent>);
  private clientesService = inject(ClientesService);
  data = inject<Encomenda | null>(MAT_DIALOG_DATA);

  clientes: Cliente[] = [];
  tipos = ['Documento', 'Caixa Pequena', 'Caixa Media', 'Caixa Grande', 'Pallet', 'Fragil'];
  tamanhos = ['Pequeno', 'Medio', 'Grande'];

  form = this.fb.nonNullable.group({
    tipo: [this.data?.tipo ?? this.tipos[0], Validators.required],
    tamanho: [this.data?.tamanho ?? this.tamanhos[0], Validators.required],
    peso: [this.data?.peso ?? null, [Validators.required, Validators.min(0.01)]],
    volume: [this.data?.volume ?? null, [Validators.required, Validators.min(0.01)]],
    preco: [this.data?.preco ?? null, [Validators.required, Validators.min(0)]],
    clienteId: [this.data?.clienteId ?? null, Validators.required],
  });

  get titulo(): string {
    return this.data ? 'Editar encomenda' : 'Nova encomenda';
  }

  ngOnInit(): void {
    this.clientesService.listar().subscribe((res) => {
      this.clientes = res;
    });
  }

  salvar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const valores = this.form.getRawValue();
    const cliente = this.clientes.find((c) => c.id === valores.clienteId);
    const encomenda: Encomenda = {
      tipo: valores.tipo,
      tamanho: valores.tamanho,
      peso: valores.peso as number,
      volume: valores.volume as number,
      preco: valores.preco as number,
      clienteId: valores.clienteId as number,
      clienteNome: cliente?.nome ?? '',
    };
    this.dialogRef.close(encomenda);
  }

  cancelar(): void {
    this.dialogRef.close();
  }
}
