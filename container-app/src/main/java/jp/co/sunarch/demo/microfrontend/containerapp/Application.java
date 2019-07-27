package jp.co.sunarch.demo.microfrontend.containerapp;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@SpringBootApplication
@Controller
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	private static final List<MicroFrontend> MICRO_FRONTENDS = Arrays.asList(
		new MicroFrontend("a-component", "AComponent", "http://localhost:8081"),
		new MicroFrontend("b-component", "BComponent", "http://localhost:8082")
	);

	private static final List<String> THEMES = Arrays.asList(
			"default",
			"cerulean",
			"cosmo",
			"cyborg",
			"darkly",
			"flatly",
			"journal",
			"litera",
			"luman",
			"lux",
			"materia",
			"minty",
			"pulse",
			"sandstone",
			"simplex",
			"sketchy",
			"slate",
			"solar",
			"spacelab",
			"superhero",
			"united",
			"yeti"
		);

	@GetMapping("/")
	public String index(Model model) {
		model.addAttribute("themes", THEMES);
		model.addAttribute("components", microFrontendIds());
		return "index";
	}

	@GetMapping("/main")
	public String main(
		Model model,
		@RequestParam(name = "theme", defaultValue = "default") String theme,
		@RequestParam(name = "components", defaultValue = "a-component,b-component") List<String> components) {
		model.addAttribute("theme", theme);
		model.addAttribute("microFrontends",
				components.stream().map(this::resolve).collect(Collectors.toList()));
		return "main";
	}

	private List<String> microFrontendIds() {
		return MICRO_FRONTENDS.stream()
				.map(MicroFrontend::getId)
				.collect(Collectors.toList());
	}

	private MicroFrontend resolve(String id) {
		return MICRO_FRONTENDS.stream()
				.filter(m -> m.getId().equals(id))
				.findFirst()
				.orElse(null);
	}

	public static class MicroFrontend {
		private final String id;
		private final String name;
		private final String url;
		
		public MicroFrontend(String id, String name, String url) {
			this.id = id;
			this.name = name;
			this.url = url;
		}

		public String getId() {
			return this.id;
		}

		public String getName() {
			return this.name;
		}

		public String getUrl() {
			return this.url;
		}
	}

}
