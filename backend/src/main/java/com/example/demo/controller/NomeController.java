package com.example.demo.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Nome;
import com.example.demo.repository.NomeRepository;

@RestController
@RequestMapping("/nomes")
@CrossOrigin(origins = "http://localhost:3000") // Permite chamadas do frontend
public class NomeController {

	private final NomeRepository nomeRepository;
	
	public NomeController(NomeRepository nomeRepository) {
		this.nomeRepository = nomeRepository;
	}
	
	// Rota para listar os nomes
	@GetMapping
	public List<Nome> listarNomes() {
		return nomeRepository.findAll();
	}
	
	// Rota para adicionar um nome
	@PostMapping
	public Nome adicionarNome(@RequestBody Nome nome) {
		return nomeRepository.save(nome);
	}
	
	@PutMapping("/{id}")
	public Nome atualizarNome(@PathVariable Long id, @RequestBody Nome novoNome) {
		return nomeRepository.findById(id)
				.map(nome -> {
					nome.setNome(novoNome.getNome());
					return nomeRepository.save(nome);
				})
				.orElseThrow(() -> new RuntimeException("Nome não encontrado!"));
	}
	
	@DeleteMapping("/{id}")
	public String deletarNome(@PathVariable Long id) {
		if (nomeRepository.existsById(id)) {
			nomeRepository.deleteById(id);
			return "Nome removido com sucesso!";
		} else {
			throw new RuntimeException("Nome não encontrado!");
		}
	}
}
