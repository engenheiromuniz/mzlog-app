import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import * as L from 'leaflet';

type Coordenada = [number, number];

const ICONE_PADRAO = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

@Component({
  selector: 'app-rota-mapa',
  standalone: true,
  imports: [],
  templateUrl: './rota-mapa.component.html',
  styleUrl: './rota-mapa.component.scss',
})
export class RotaMapaComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() origem = '';
  @Input() destino = '';

  @ViewChild('mapaEl', { static: true }) mapaEl!: ElementRef<HTMLDivElement>;

  carregando = false;
  erro = '';

  private map?: L.Map;
  private camada?: L.LayerGroup;

  ngAfterViewInit(): void {
    this.map = L.map(this.mapaEl.nativeElement).setView([-14.235, -51.9253], 4);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 18,
    }).addTo(this.map);
    this.camada = L.layerGroup().addTo(this.map);
    this.tracarRota();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.map && (changes['origem'] || changes['destino'])) {
      this.tracarRota();
    }
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }

  private async tracarRota(): Promise<void> {
    if (!this.origem || !this.destino || !this.map || !this.camada) {
      return;
    }
    this.erro = '';
    this.carregando = true;
    this.camada.clearLayers();

    try {
      const [coordOrigem, coordDestino] = await Promise.all([
        this.geocodificar(this.origem),
        this.geocodificar(this.destino),
      ]);

      if (!coordOrigem || !coordDestino) {
        this.erro = 'Nao foi possivel localizar a origem/destino no mapa.';
        return;
      }

      const caminho = await this.buscarCaminho(coordOrigem, coordDestino);
      this.desenharMapa(coordOrigem, coordDestino, caminho);
    } catch {
      this.erro = 'Erro ao carregar o mapa da rota.';
    } finally {
      this.carregando = false;
    }
  }

  private async geocodificar(local: string): Promise<Coordenada | null> {
    const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(
      local + ', Brasil',
    )}`;
    const resposta = await fetch(url);
    const dados = await resposta.json();
    if (!dados || dados.length === 0) {
      return null;
    }
    return [parseFloat(dados[0].lat), parseFloat(dados[0].lon)];
  }

  private async buscarCaminho(origem: Coordenada, destino: Coordenada): Promise<Coordenada[]> {
    const url = `https://router.project-osrm.org/route/v1/driving/${origem[1]},${origem[0]};${destino[1]},${destino[0]}?overview=full&geometries=geojson`;
    const resposta = await fetch(url);
    const dados = await resposta.json();
    const coordenadas: number[][] = dados?.routes?.[0]?.geometry?.coordinates ?? [];
    return coordenadas.map((c) => [c[1], c[0]] as Coordenada);
  }

  private desenharMapa(origem: Coordenada, destino: Coordenada, caminho: Coordenada[]): void {
    if (!this.map || !this.camada) {
      return;
    }
    L.marker(origem, { icon: ICONE_PADRAO }).bindPopup('Origem').addTo(this.camada);
    L.marker(destino, { icon: ICONE_PADRAO }).bindPopup('Destino').addTo(this.camada);

    if (caminho.length > 0) {
      const linha = L.polyline(caminho, { color: '#0d47a1', weight: 5 }).addTo(this.camada);
      this.map.fitBounds(linha.getBounds(), { padding: [24, 24] });
    } else {
      this.map.fitBounds(L.latLngBounds([origem, destino]), { padding: [24, 24] });
    }
  }
}
